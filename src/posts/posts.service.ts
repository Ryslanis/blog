import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private fileService: FileService,
    ) {}

    async create(dto: CreatePostDto, userId, image: any) {
        const fileName = await this.fileService.createFile(image)
        const post = await this.postRepository.create({...dto, author: userId, image: fileName})
        return post
    }

}
