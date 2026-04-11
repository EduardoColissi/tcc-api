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
            },
        });
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