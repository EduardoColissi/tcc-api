import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FocusEventType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';
import { CreateFocusEventsDto } from './dto/create-focus-event.dto';

@Injectable()
export class PomodoroService {
  constructor(private prisma: PrismaService) {}

  async createSession(userId: number, dto: CreateSessionDto) {
    const task = await this.prisma.task.findUnique({ where: { id: dto.taskId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada.');
    if (task.userId !== userId) throw new ForbiddenException();

    // Close any dangling open session for this user before creating a new one
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

  async logFocusEvents(userId: number, sessionId: number, dto: CreateFocusEventsDto) {
    const session = await this.prisma.pomodoroSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Sessão não encontrada.');
    if (session.userId !== userId) throw new ForbiddenException();

    await this.prisma.focusEvent.createMany({
      data: dto.events.map((e) => ({
        sessionId,
        type: e.type as FocusEventType,
        startedAt: new Date(e.startedAt),
        endedAt: e.endedAt ? new Date(e.endedAt) : null,
        durationMs: e.durationMs ?? null,
      })),
    });

    return { inserted: dto.events.length };
  }

  async getSessionFocusSummary(userId: number, sessionId: number) {
    const session = await this.prisma.pomodoroSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Sessão não encontrada.');
    if (session.userId !== userId) throw new ForbiddenException();

    const grouped = await this.prisma.focusEvent.groupBy({
      by: ['type'],
      where: { sessionId },
      _count: { _all: true },
      _sum: { durationMs: true },
    });

    const byType = grouped.reduce<Record<string, { count: number; totalDurationMs: number }>>(
      (acc, row) => {
        acc[row.type] = {
          count: row._count._all,
          totalDurationMs: row._sum.durationMs ?? 0,
        };
        return acc;
      },
      {},
    );

    const total = grouped.reduce((acc, row) => acc + row._count._all, 0);

    return { sessionId, total, byType };
  }

  async endSession(userId: number, sessionId: number, dto: EndSessionDto) {
    const session = await this.prisma.pomodoroSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Sessão não encontrada.');
    if (session.userId !== userId) throw new ForbiddenException();

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

  async getActiveSession(userId: number) {
    return this.prisma.pomodoroSession.findFirst({
      where: { userId, endedAt: null },
      include: { task: { select: { id: true, title: true, status: true } } },
      orderBy: { startedAt: 'desc' },
    });
  }

  getSessions(userId: number, taskId?: number) {
    return this.prisma.pomodoroSession.findMany({
      where: { userId, ...(taskId ? { taskId } : {}), endedAt: { not: null } },
      orderBy: { startedAt: 'desc' },
    });
  }

  async getFocusHistory(userId: number) {
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

    if (sessions.length === 0) return [];

    const grouped = await this.prisma.focusEvent.groupBy({
      by: ['sessionId', 'type'],
      where: { sessionId: { in: sessions.map((s) => s.id) } },
      _count: { _all: true },
      _sum: { durationMs: true },
    });

    const bySession = new Map<
      number,
      { total: number; byType: Record<string, { count: number; totalDurationMs: number }> }
    >();
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

  async getStats(userId: number, taskId: number) {
    const sessions = await this.prisma.pomodoroSession.findMany({
      where: { userId, taskId, completed: true, type: 'FOCUS', endedAt: { not: null } },
    });

    const totalFocusSessions = sessions.length;
    const totalFocusSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds ?? 0), 0);

    return { totalFocusSessions, totalFocusSeconds };
  }
}
