import { WorkModel } from '@prisma/client';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  jobTitle?: string;

  @IsOptional()
  @IsEnum(WorkModel)
  workModel?: WorkModel;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  company?: string;
}
