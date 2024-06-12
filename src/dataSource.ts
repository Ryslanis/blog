import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";

const env = process.env.NODE_ENV || 'development';
const envFile = `.${env}.env`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const connectionOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false, 
    logging: false,
    migrationsRun: false,
    entities: ["dist/**/*.model.js"],
    migrations: ["dist/migrations/*.js"],

};

export default new DataSource({
    ...connectionOptions,
  });