import { Injectable } from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    async createRole(dto: createRoleDto) {
        const role = await this.roleRepository.create(dto)
        return await this.roleRepository.save(role)
    }

    async getRoleByName(name: string) {
        const role = await this.roleRepository.findOne({where: {name}})
        return role
    }
}
