import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

// interface UserCreationAttrs {
//     email: string,
//     password: string,
// }


@Entity({name: "users"})
@Unique(['email'])
export class User {
    @ApiProperty({example: '1', description: 'Identificator'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'test@gmail.com', description: 'User email'})
    @Column()
    email: string

    @ApiProperty({example: '12345!Qwerty', description: 'User password'})
    @Column()
    password: string


    @ApiProperty({example: 'true', description: 'Is access denied'})
    @Column({
        default: false
    })
    banned: boolean


    @ApiProperty({example: 'Spam', description: 'Ban reason'})
    @Column({
        nullable: true
    })
    banReason: string

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

}