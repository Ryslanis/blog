import { IsString } from "class-validator"

export class createRoleDto {
    @IsString()
    readonly name: string
    @IsString()
    readonly description: string
}