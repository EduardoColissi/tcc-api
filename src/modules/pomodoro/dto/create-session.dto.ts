import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export enum SessionTypeDto {
  FOCUS = 'FOCUS',
  BREAK = 'BREAK',
}

export class CreateSessionDto {
  @IsNumber()
  @IsPositive()
  taskId: number;

  @IsEnum(SessionTypeDto)
  type: SessionTypeDto;

  @IsNumber()
  @IsPositive()
  cycleNumber: number;
}
