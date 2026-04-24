import { TaskStatus } from '@prisma/client';
export declare class MoveTaskDto {
    status: TaskStatus;
    position: number;
}
