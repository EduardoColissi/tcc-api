import { TaskPriority, TaskType } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  position?: number;
}
