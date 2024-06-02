import { Body, Controller, Get, Post, Request, UseGuards, UsePipes} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CustomValidationPipe } from 'src/pipes/pipe.validation';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
  }

    @UsePipes(CustomValidationPipe)
    @Post('registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
        
    }
}
