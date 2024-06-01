import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/user.model";
import { Repository } from "typeorm";

export class UserRolesService {
    constructor (
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
) {}
}