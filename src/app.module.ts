import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { User } from "./users/user.model";
import { Role } from "./roles/roles.model";
import { Post } from "./posts/posts.model";
import dataSource from "./dataSource";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        TypeOrmModule.forRoot({
            ...dataSource.options,
        }),
        UsersModule,
        RolesModule,
        UserRolesModule,
        AuthModule,
        PostsModule,
        FileModule,
    ]
})

export class AppModule {}