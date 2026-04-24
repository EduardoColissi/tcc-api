import { TaskPriority, TaskType } from '@prisma/client';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
    type?: TaskType;
    dueDate?: string;
    position?: number;
}
