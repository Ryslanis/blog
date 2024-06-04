import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';


@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: "Create a role"})
    @ApiResponse({status: 200, type: Role})
    @Post()    
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary: "Get a role by name"})
    @ApiResponse({status: 200, type: Role})
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name)
    }

}
