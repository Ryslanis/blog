import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostsDto } from './dto/get-posts.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/utils/constants';


@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}
    
    @ApiOperation({summary: 'Create a post'})
    @ApiResponse({status: 200})
    @UseInterceptors(FileInterceptor('image'))
    @Roles([ROLES.USER])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createPost(
        @Body() dto: CreatePostDto, 
        @UploadedFile() image,
        @Req() req: any,
    ) {
        const user = req.user
        const userId = user.userId;
        return this.postService.create(dto, userId, image)
    }

    @Get('/')
    getPosts(@Query() query: GetPostsDto) {
        return this.postService.getAll(query)
    }

    @Get(':id')
    onePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getOne(id)
    }


}
