import type { User } from '@prisma/client';
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
        userId: number;
        taskId: number;
        cycleNumber: number;
        completed: boolean;
        endedAt: Date | null;
        startedAt: Date;
        durationSeconds: number | null;
    }>;
    endSession(user: User, id: number, dto: EndSessionDto): Promise<{
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
        userId: number;
        taskId: number;
        cycleNumber: number;
        completed: boolean;
        endedAt: Date | null;
        startedAt: Date;
        durationSeconds: number | null;
    }) | null>;
    getSessions(user: User, taskId?: number): import(".prisma/client").Prisma.PrismaPromise<{
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
    getStats(user: User, taskId: number): Promise<{
        totalFocusSessions: number;
        totalFocusSeconds: number;
    }>;
}
