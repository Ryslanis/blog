import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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
        const [users, count] = await this.userRepository.findAndCount({ relations: ['roles']})
        return {users, count};
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.createQueryBuilder("user")
        .addSelect("user.password")
        .leftJoinAndSelect("user.roles", "roles")
        .where("user.email = :email", { email })
        .getOne()

        return user;
    }


    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findOne({where: {id: dto.userId}, relations: ['roles']})
        if (user.roles.some(role => role.name == dto.name)) {
            throw new BadRequestException(`User already has role ${dto.name}`)
        }

        const role = await this.roleService.getRoleByName(dto.name)
        if (user && role) {
            user.roles.push(role)
            await this.userRepository.save(user)
            return dto
        }
        throw new NotFoundException('User or role is not found')
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOne({where: {id: dto.userId}})
        if (user) {
            user.banned = true
            user.banReason = dto.banReason
            await this.userRepository.save(user)
            return user
        }
        throw new NotFoundException('User is not found')
    }
}

