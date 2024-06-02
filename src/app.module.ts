import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/user.model";
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRolesModule } from './user-roles/user-roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

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
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Role, Post],
            synchronize: true,
            autoLoadEntities: true,
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