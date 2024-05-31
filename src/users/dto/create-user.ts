import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'User email'})
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @ApiProperty({example: '12345!Qwerty', description: 'User password'})
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}