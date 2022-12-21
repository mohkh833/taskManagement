import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/task/task.entity";
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.js'] ,
    synchronize: true,
}