import { TaskStatus } from '@prisma/client';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class MoveTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNumber()
  @Min(0)
  position: number;
}
