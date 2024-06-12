import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

interface UserCreationAttrs {
    email: string,
    password: string,
}


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
    @Column({select: false})
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

    @ApiProperty({ example: '2024-06-02T12:34:56.789Z', description: 'Creation timestamp' })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}