"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomodoroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PomodoroService = class PomodoroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(userId, dto) {
        const task = await this.prisma.task.findUnique({ where: { id: dto.taskId } });
        if (!task)
            throw new common_1.NotFoundException('Tarefa não encontrada.');
        if (task.userId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.pomodoroSession.updateMany({
            where: { userId, endedAt: null },
            data: { endedAt: new Date(), completed: false },
        });
        return this.prisma.pomodoroSession.create({
            data: {
                userId,
                taskId: dto.taskId,
                type: dto.type,
                cycleNumber: dto.cycleNumber,
                monitoringEnabled: dto.monitoringEnabled ?? false,
            },
        });
    }
    async logFocusEvents(userId, sessionId, dto) {
        const session = await this.prisma.pomodoroSession.findUnique({ where: { id: sessionId } });
        if (!session)
            throw new common_1.NotFoundException('Sessão não encontrada.');
        if (session.userId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.focusEvent.createMany({
            data: dto.events.map((e) => ({
                sessionId,
                type: e.type,
                startedAt: new Date(e.startedAt),
                endedAt: e.endedAt ? new Date(e.endedAt) : null,
                durationMs: e.durationMs ?? null,
            })),
        });
        return { inserted: dto.events.length };
    }
    async getSessionFocusSummary(userId, sessionId) {
        const session = await this.prisma.pomodoroSession.findUnique({ where: { id: sessionId } });
        if (!session)
            throw new common_1.NotFoundException('Sessão não encontrada.');
        if (session.userId !== userId)
            throw new common_1.ForbiddenException();
        const grouped = await this.prisma.focusEvent.groupBy({
            by: ['type'],
            where: { sessionId },
            _count: { _all: true },
            _sum: { durationMs: true },
        });
        const byType = grouped.reduce((acc, row) => {
            acc[row.type] = {
                count: row._count._all,
                totalDurationMs: row._sum.durationMs ?? 0,
            };
            return acc;
        }, {});
        const total = grouped.reduce((acc, row) => acc + row._count._all, 0);
        return { sessionId, total, byType };
    }
    async endSession(userId, sessionId, dto) {
        const session = await this.prisma.pomodoroSession.findUnique({ where: { id: sessionId } });
        if (!session)
            throw new common_1.NotFoundException('Sessão não encontrada.');
        if (session.userId !== userId)
            throw new common_1.ForbiddenException();
        const endedAt = new Date();
        const actualSeconds = Math.round((endedAt.getTime() - session.startedAt.getTime()) / 1000);
        const durationSeconds = dto.completed && dto.plannedDurationSeconds
            ? dto.plannedDurationSeconds
            : actualSeconds;
        return this.prisma.pomodoroSession.update({
            where: { id: sessionId },
            data: { endedAt, durationSeconds, completed: dto.completed },
        });
    }
    async getActiveSession(userId) {
        return this.prisma.pomodoroSession.findFirst({
            where: { userId, endedAt: null },
            include: { task: { select: { id: true, title: true, status: true } } },
            orderBy: { startedAt: 'desc' },
        });
    }
    getSessions(userId, taskId) {
        return this.prisma.pomodoroSession.findMany({
            where: { userId, ...(taskId ? { taskId } : {}), endedAt: { not: null } },
            orderBy: { startedAt: 'desc' },
        });
    }
    async getFocusHistory(userId) {
        const sessions = await this.prisma.pomodoroSession.findMany({
            where: {
                userId,
                type: 'FOCUS',
                endedAt: { not: null },
            },
            orderBy: { startedAt: 'desc' },
            include: {
                task: { select: { id: true, title: true } },
            },
        });
        if (sessions.length === 0)
            return [];
        const grouped = await this.prisma.focusEvent.groupBy({
            by: ['sessionId', 'type'],
            where: { sessionId: { in: sessions.map((s) => s.id) } },
            _count: { _all: true },
            _sum: { durationMs: true },
        });
        const bySession = new Map();
        for (const row of grouped) {
            const entry = bySession.get(row.sessionId) ?? { total: 0, byType: {} };
            entry.byType[row.type] = {
                count: row._count._all,
                totalDurationMs: row._sum.durationMs ?? 0,
            };
            entry.total += row._count._all;
            bySession.set(row.sessionId, entry);
        }
        return sessions.map((s) => ({
            ...s,
            focusSummary: bySession.get(s.id) ?? { total: 0, byType: {} },
        }));
    }
    async getStats(userId, taskId) {
        const sessions = await this.prisma.pomodoroSession.findMany({
            where: { userId, taskId, completed: true, type: 'FOCUS', endedAt: { not: null } },
        });
        const totalFocusSessions = sessions.length;
        const totalFocusSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds ?? 0), 0);
        return { totalFocusSessions, totalFocusSeconds };
    }
};
exports.PomodoroService = PomodoroService;
exports.PomodoroService = PomodoroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PomodoroService);
//# sourceMappingURL=pomodoro.service.js.map