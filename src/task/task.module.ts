import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
