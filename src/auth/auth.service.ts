import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/user.model';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Incorrect email address');
      }
      const isPasswordValid = await this.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Incorrect password');
      }
      return user;
    }
  
 
    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new BadRequestException(`User with email ${userDto.email} already exists`) 
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.login(user)
    }
    
    async login(user: User) {
        return this.generateToken(user)
      }

    async generateToken(user: User) {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
  }
}

