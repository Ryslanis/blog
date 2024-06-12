import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcryptjs"

export class Seed1718190510059 implements MigrationInterface {
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('USER', 'Can write posts')`)
            await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('MODERATOR', 'Can ban users')`)
            await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('ADMIN', 'Can everything')`)
            const adminPassword = '12345'
            const hashPassword = await bcrypt.hash(adminPassword, 5)
            await queryRunner.query(`INSERT INTO users (email, password) VALUES ('admin@gmail.com', '${hashPassword}')  ON CONFLICT (email) DO NOTHING`)
            await queryRunner.query(`INSERT INTO users (email, password) VALUES ('moderator@gmail.com', '${hashPassword}')  ON CONFLICT (email) DO NOTHING`)
            await queryRunner.query(`INSERT INTO users (email, password) VALUES ('user@gmail.com', '${hashPassword}')  ON CONFLICT (email) DO NOTHING`)
            

            const adminId = (await queryRunner.query(`SELECT id FROM users WHERE email = 'admin@gmail.com'`))[0].id;
            const moderatorId = (await queryRunner.query(`SELECT id FROM users WHERE email = 'moderator@gmail.com'`))[0].id;
            const userId = (await queryRunner.query(`SELECT id FROM users WHERE email = 'user@gmail.com'`))[0].id;
    
            const userRoleId = (await queryRunner.query(`SELECT id FROM roles WHERE name = 'USER'`))[0].id
            const moderatorRoleId = (await queryRunner.query(`SELECT id FROM roles WHERE name = 'MODERATOR'`))[0].id
            const adminRoleId = (await queryRunner.query(`SELECT id FROM roles WHERE name = 'ADMIN'`))[0].id
    
            await queryRunner.query(`INSERT INTO user_roles VALUES (${adminId}, ${moderatorRoleId}) ON CONFLICT DO NOTHING`);
            await queryRunner.query(`INSERT INTO user_roles VALUES (${adminId}, ${adminRoleId}) ON CONFLICT DO NOTHING`);
            await queryRunner.query(`INSERT INTO user_roles VALUES (${adminId}, ${userRoleId}) ON CONFLICT DO NOTHING`);
            await queryRunner.query(`INSERT INTO user_roles VALUES (${moderatorId}, ${moderatorRoleId}) ON CONFLICT DO NOTHING`);
            await queryRunner.query(`INSERT INTO user_roles VALUES (${userId}, ${userRoleId}) ON CONFLICT DO NOTHING`);
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`DELETE FROM "user_roles" CASCADE`);
            await queryRunner.query(`DELETE FROM  "roles" CASCADE`);
        }
}
