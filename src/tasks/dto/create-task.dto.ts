import { IsString, IsNotEmpty, MaxLength, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsIn(['PENDING', 'DONE'])
  status: 'PENDING' | 'DONE';
}
