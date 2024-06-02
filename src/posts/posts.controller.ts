import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}
    
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
