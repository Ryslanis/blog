import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: "New features of Python 3.15", description: 'Post title'})
    @IsString()
    readonly title: string;
    @ApiProperty({example: "Let's discuss new features of Python 3.15", description: 'Post content'})
    @IsString()
    readonly content: string
}