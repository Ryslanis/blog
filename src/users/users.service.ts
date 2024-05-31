import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(dto: CreateUserDto) {
        const user = this.userRepository.create(dto)
        return await this.userRepository.save(user)
    }

    async getAllUsers() {
        const users = await this.userRepository.findAndCount();
        return users;
    }
}
