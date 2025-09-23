import { IsString, MaxLength, IsIn, IsOptional } from "class-validator";

export class UpdateTaskDto {
@IsString()
@IsOptional()
@MaxLength(50)
title?: string;

@IsString()
@IsOptional()
@MaxLength(200)
description?: string;

@IsOptional()
@IsIn(['PENDING', 'DONE']) 
status?: 'PENDING' | 'DONE';
}