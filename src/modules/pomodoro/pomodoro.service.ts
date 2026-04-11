import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';

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
      },
    });
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

  async getStats(userId: number, taskId: number) {
    const sessions = await this.prisma.pomodoroSession.findMany({
      where: { userId, taskId, completed: true, type: 'FOCUS', endedAt: { not: null } },
    });

    const totalFocusSessions = sessions.length;
    const totalFocusSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds ?? 0), 0);

    return { totalFocusSessions, totalFocusSeconds };
  }
}
