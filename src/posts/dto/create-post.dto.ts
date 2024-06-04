import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { constraint } from "src/utils/constants";

export class CreatePostDto {
    @ApiProperty({example: "New features of Python 3.15", description: 'Post title'})
    @IsString()
    @Length(constraint.minTitleLength, constraint.maxTitleLength)
    readonly title: string;
    @ApiProperty({example: "Let's discuss new features of Python 3.15", description: 'Post content'})
    @IsString()
    @Length(constraint.minContentLength, constraint.maxContentLength)
    readonly content: string
}