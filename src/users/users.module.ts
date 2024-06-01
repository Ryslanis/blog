import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { RolesModule } from 'src/roles/roles.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // }
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
