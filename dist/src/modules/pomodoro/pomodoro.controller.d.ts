import type { User } from '@prisma/client';
import { CreateFocusEventsDto } from './dto/create-focus-event.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';
import { PomodoroService } from './pomodoro.service';
export declare class PomodoroController {
    private pomodoro;
    constructor(pomodoro: PomodoroService);
    createSession(user: User, dto: CreateSessionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        userId: number;
        taskId: number;
    }>;
    endSession(user: User, id: number, dto: EndSessionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        userId: number;
        taskId: number;
    }>;
    getActiveSession(user: User): Promise<({
        task: {
            id: number;
            title: string;
            status: import(".prisma/client").$Enums.TaskStatus;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        userId: number;
        taskId: number;
    }) | null>;
    getSessions(user: User, taskId?: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        userId: number;
        taskId: number;
    }[]>;
    getStats(user: User, taskId: number): Promise<{
        totalFocusSessions: number;
        totalFocusSeconds: number;
    }>;
    getFocusHistory(user: User): Promise<{
        focusSummary: {
            total: number;
            byType: Record<string, {
                count: number;
                totalDurationMs: number;
            }>;
        };
        task: {
            id: number;
            title: string;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        userId: number;
        taskId: number;
    }[]>;
    logFocusEvents(user: User, id: number, dto: CreateFocusEventsDto): Promise<{
        inserted: number;
    }>;
    getFocusSummary(user: User, id: number): Promise<{
        sessionId: number;
        total: number;
        byType: Record<string, {
            count: number;
            totalDurationMs: number;
        }>;
    }>;
}
