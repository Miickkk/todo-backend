import { IsString, IsNumber, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}