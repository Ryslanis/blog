import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()    
    create(@Body() dto: createRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name)
    }
}