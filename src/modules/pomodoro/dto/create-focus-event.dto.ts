import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export enum FocusEventTypeDto {
  PERSON_ABSENT = 'PERSON_ABSENT',
  CELL_PHONE = 'CELL_PHONE',
  MULTIPLE_PEOPLE = 'MULTIPLE_PEOPLE',
  HEAD_TURNED = 'HEAD_TURNED',
  LOOKING_DOWN = 'LOOKING_DOWN',
  EYES_CLOSED = 'EYES_CLOSED',
}

export class FocusEventItemDto {
  @IsEnum(FocusEventTypeDto)
  type: FocusEventTypeDto;

  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsDateString()
  endedAt?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  durationMs?: number;
}

export class CreateFocusEventsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => FocusEventItemDto)
  events: FocusEventItemDto[];
}
