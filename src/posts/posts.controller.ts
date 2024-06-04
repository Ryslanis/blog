import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}
    
    @ApiTags('Create a post')
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
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

}
