import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.model";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'roles'})
export class Role {
    @ApiProperty({example: '1', description: 'Identificator'})
    @PrimaryGeneratedColumn()
    id: number
    
    @ApiProperty({example: 'MODERATOR', description: 'Unique value'})
    @Column({unique: true})
    name: string

    @ApiProperty({example: `Can ban users, can edit users' messages`, description: 'Permissions'})
    @Column()
    description: string

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}