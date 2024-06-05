import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';
import { GetPostsDto } from './dto/get-posts.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private fileService: FileService,
    ) {}

    async create(dto: CreatePostDto, userId, image: any) {
        if (!image) {
            throw new BadRequestException("No image provided")
        }
        const fileName = await this.fileService.createFile(image)
        const post = await this.postRepository.create({...dto, author: userId, image: fileName})
        return await this.postRepository.save(post)
    }
    async getAll(query: GetPostsDto) {
        const { limit, page, userId, search, sortField, sortOrder } = query;

        const queryBuilder = this.postRepository.createQueryBuilder('post')
        if (userId) {
            queryBuilder.andWhere('post.authorId = :userId', {userId});
        }

        if (search) {
            queryBuilder.andWhere('post.title ILIKE :search OR post.content LIKE :search', { search: `%${search}%` });
        }
        
        queryBuilder
        .orderBy(`post.${sortField}`, sortOrder)
        .skip((page - 1) * limit)
        .take(limit);

        const [result, total] = await queryBuilder.getManyAndCount();
        return {
            posts: result,
            total
        }
    }

    async getOne(id: number) {
        const post = await this.postRepository.findOne({
            where: {id},
            relations: ['users']
        })
        return post
    }
}
