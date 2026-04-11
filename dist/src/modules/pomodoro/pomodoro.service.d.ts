import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';
export declare class PomodoroService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(userId: number, dto: CreateSessionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        userId: number;
        taskId: number;
        cycleNumber: number;
        completed: boolean;
        endedAt: Date | null;
        startedAt: Date;
        durationSeconds: number | null;
    }>;
    endSession(userId: number, sessionId: number, dto: EndSessionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        userId: number;
        taskId: number;
        cycleNumber: number;
        completed: boolean;
        endedAt: Date | null;
        startedAt: Date;
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
        taskId: number;
        cycleNumber: number;
        completed: boolean;
        endedAt: Date | null;
        startedAt: Date;
        durationSeconds: number | null;
    }) | null>;
    getSessions(userId: number, taskId?: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SessionType;
        userId: number;
        taskId: number;
        cycleNumber: number;
        completed: boolean;
        endedAt: Date | null;
        startedAt: Date;
        durationSeconds: number | null;
    }[]>;
    getStats(userId: number, taskId: number): Promise<{
        totalFocusSessions: number;
        totalFocusSeconds: number;
    }>;
}
