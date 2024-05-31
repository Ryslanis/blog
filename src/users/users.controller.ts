import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';


@ApiTags('Registrated users')
@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService) {}
    

    @ApiOperation({summary: 'Create a user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }
}
