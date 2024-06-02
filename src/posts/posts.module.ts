import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.model';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    FileModule,
    AuthModule,
  ],
})
export class PostsModule {}
