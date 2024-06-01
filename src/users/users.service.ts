import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = this.userRepository.create(dto)
        const role = await this.roleService.getRoleByName("USER")
        user.roles = [role]
        return await this.userRepository.save(user)
    }

    async getAllUsers() {
        const users = await this.userRepository.findAndCount({ relations: ['roles']});
        return users;
    }
}
