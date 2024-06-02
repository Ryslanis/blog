import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

const minLengthPassword = 5 
const maxLengthPassword = 10 

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'User email'})
    @IsString()
    @IsEmail()
    readonly email: string;
    
    @ApiProperty({example: '12345!Qwerty', description: 'User password'})
    @IsString()
    @Length(minLengthPassword, maxLengthPassword, {
        message: `A password length should be ${minLengthPassword}-${maxLengthPassword} characters`
    })
    readonly password: string;
}