// src/tasks/dto/create-task.dto.ts
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  @MaxLength(100) 
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description: string;
}
