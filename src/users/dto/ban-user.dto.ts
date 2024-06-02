import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class BanUserDto {
    @ApiProperty({'example': 1, description: "User's ID"})
    @IsNumber()
    readonly userId: number
    @ApiProperty({'example': "Fake account", description: "Ban reasson"})
    @IsString()
    readonly banReason: string
}