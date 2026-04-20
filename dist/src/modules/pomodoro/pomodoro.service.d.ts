import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';
import { CreateFocusEventsDto } from './dto/create-focus-event.dto';
export declare class PomodoroService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(userId: number, dto: CreateSessionDto): Promise<{
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        taskId: number;
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
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        taskId: number;
    }>;
    getActiveSession(userId: number): Promise<({
        task: {
            id: number;
            title: string;
            status: import(".prisma/client").$Enums.TaskStatus;
        };
    } & {
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        taskId: number;
    }) | null>;
    getSessions(userId: number, taskId?: number): import(".prisma/client").Prisma.PrismaPromise<{
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        taskId: number;
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
        type: import(".prisma/client").$Enums.SessionType;
        cycleNumber: number;
        startedAt: Date;
        endedAt: Date | null;
        durationSeconds: number | null;
        completed: boolean;
        monitoringEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        taskId: number;
    }[]>;
    getStats(userId: number, taskId: number): Promise<{
        totalFocusSessions: number;
        totalFocusSeconds: number;
    }>;
}
