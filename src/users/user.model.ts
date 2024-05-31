import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// interface UserCreationAttrs {
//     email: string,
//     password: string,
// }


@Entity({name: "users"})
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
}