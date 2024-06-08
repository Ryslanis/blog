import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { CONSTRAINTS } from "src/utils/constants";

export class CreatePostDto {
    @ApiProperty({example: "New features of Python 3.15", description: 'Post title'})
    @IsString()
    @Length(CONSTRAINTS.minTitleLength, CONSTRAINTS.maxTitleLength)
    readonly title: string;
    @ApiProperty({example: "Let's discuss new features of Python 3.15", description: 'Post content'})
    @IsString()
    @Length(CONSTRAINTS.minContentLength, CONSTRAINTS.maxContentLength)
    readonly content: string
}