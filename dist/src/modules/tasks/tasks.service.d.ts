import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        priority: import(".prisma/client").$Enums.TaskPriority;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
        status: import(".prisma/client").$Enums.TaskStatus;
        userId: number;
    }[]>;
    findToday(userId: number): Promise<{
        priority: import(".prisma/client").$Enums.TaskPriority;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
        status: import(".prisma/client").$Enums.TaskStatus;
        userId: number;
    }[]>;
    create(userId: number, dto: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        priority: import(".prisma/client").$Enums.TaskPriority;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
        status: import(".prisma/client").$Enums.TaskStatus;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(userId: number, taskId: number, dto: UpdateTaskDto): Promise<{
        priority: import(".prisma/client").$Enums.TaskPriority;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
        status: import(".prisma/client").$Enums.TaskStatus;
        userId: number;
    }>;
    move(userId: number, taskId: number, dto: MoveTaskDto): Promise<{
        priority: import(".prisma/client").$Enums.TaskPriority;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
        status: import(".prisma/client").$Enums.TaskStatus;
        userId: number;
    }>;
    remove(userId: number, taskId: number): Promise<{
        message: string;
    }>;
    private findTaskOrFail;
}
