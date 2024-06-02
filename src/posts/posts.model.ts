import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "posts"})
export class Post {
    @ApiProperty({example: '1', description: 'Post identificator'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: "New features of Python 3.15", description: 'Post title'})
    @Column()
    title: string
    
    @ApiProperty({example: "Let's discuss new features of Python 3.15", description: 'Post content'})
    @Column()
    content: string

    @ApiProperty({example: "688d0fd0-e8f3-407c-a75e-458793fe20d4", description: 'Post image UUID'})
    @Column()
    image: string

    @ManyToOne(() => User, user => user.posts)
    author: User
}