import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/user.model';
import { UserRolesService } from './user-roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UserRolesService],
    exports: [UserRolesService]
})
export class UserRolesModule {}
