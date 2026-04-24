import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';
import { CreateFocusEventsDto } from './dto/create-focus-event.dto';
export declare class PomodoroService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(userId: number, dto: CreateSessionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        userId: number;
        startedAt: Date;
        endedAt: Date | null;
        taskId: number;
        cycleNumber: number;
        monitoringEnabled: boolean;
        completed: boolean;
        durationSeconds: number | null;
    }>;
    logFocusEvents(userId: number, sessionId: number, dto: CreateFocusEventsDto): Promise<{
        inserted: number;
    }>;
    getSessionFocusSummary(userId: number, sessionId: number): Promise<{
        sessionId: number;
        total: number;
        byType: Record<string, {
            count: number;
            totalDurationMs: number;
        }>;
    }>;
    endSession(userId: number, sessionId: number, dto: EndSessionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        userId: number;
        startedAt: Date;
        endedAt: Date | null;
        taskId: number;
        cycleNumber: number;
        monitoringEnabled: boolean;
        completed: boolean;
        durationSeconds: number | null;
    }>;
    getActiveSession(userId: number): Promise<({
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
        userId: number;
        startedAt: Date;
        endedAt: Date | null;
        taskId: number;
        cycleNumber: number;
        monitoringEnabled: boolean;
        completed: boolean;
        durationSeconds: number | null;
    }) | null>;
    getSessions(userId: number, taskId?: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        userId: number;
        startedAt: Date;
        endedAt: Date | null;
        taskId: number;
        cycleNumber: number;
        monitoringEnabled: boolean;
        completed: boolean;
        durationSeconds: number | null;
    }[]>;
    getFocusHistory(userId: number): Promise<{
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
        userId: number;
        startedAt: Date;
        endedAt: Date | null;
        taskId: number;
        cycleNumber: number;
        monitoringEnabled: boolean;
        completed: boolean;
        durationSeconds: number | null;
    }[]>;
    getStats(userId: number, taskId: number): Promise<{
        totalFocusSessions: number;
        totalFocusSeconds: number;
    }>;
}
