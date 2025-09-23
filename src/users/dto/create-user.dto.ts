import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
@IsEmail()
@IsNotEmpty()
email: string;
@IsString()
@IsNotEmpty()
@MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
password: string;
}