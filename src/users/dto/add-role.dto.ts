import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AddRoleDto {
    @ApiProperty({'example': 'ADMIN', description: 'Role'})
    @IsString()
    readonly name: string
    @ApiProperty({'example': 1, description: "User's ID"})
    @IsNumber()
    readonly userId: number
}