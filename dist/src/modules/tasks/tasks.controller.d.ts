import type { User } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private tasks;
    constructor(tasks: TasksService);
    findAll(user: User): import(".prisma/client").Prisma.PrismaPromise<{
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
    findToday(user: User): Promise<{
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
    create(user: User, dto: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
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
    update(user: User, id: number, dto: UpdateTaskDto): Promise<{
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
    move(user: User, id: number, dto: MoveTaskDto): Promise<{
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
    remove(user: User, id: number): Promise<{
        message: string;
    }>;
}
