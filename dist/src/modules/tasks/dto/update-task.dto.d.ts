import { TaskPriority, TaskStatus, TaskType } from '@prisma/client';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    type?: TaskType;
    dueDate?: string;
    position?: number;
}
