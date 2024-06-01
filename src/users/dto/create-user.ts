import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'User email'})
    @IsEmail()
    readonly email: string;
    
    @ApiProperty({example: '12345!Qwerty', description: 'User password'})
    @IsString()
    @MinLength(6)
    readonly password: string;
}