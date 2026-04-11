import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class EndSessionDto {
  @IsBoolean()
  completed: boolean;

  // Client-provided planned duration in seconds (e.g. 25*60 for focus)
  // Used when completed=true to store exact planned duration
  @IsOptional()
  @IsNumber()
  @IsPositive()
  plannedDurationSeconds?: number;
}
