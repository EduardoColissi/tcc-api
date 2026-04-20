import type { User } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private tasks;
    constructor(tasks: TasksService);
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
    }[]>;
    findToday(user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
    }[]>;
    create(user: User, dto: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(user: User, id: number, dto: UpdateTaskDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
    }>;
    move(user: User, id: number, dto: MoveTaskDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        type: import(".prisma/client").$Enums.TaskType;
        dueDate: Date | null;
        position: number;
    }>;
    remove(user: User, id: number): Promise<{
        message: string;
    }>;
}
