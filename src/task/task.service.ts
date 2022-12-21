import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from "./task-status-enum";
import { CreateTaskDto } from './dto/create-task-dto';
import {UpdateTaskDto} from './dto/update-task-dto'
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import {InjectRepository} from '@nestjs/typeorm'
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {

    }

    getTasks(
        filterDto: GetTaskFilterDto,
        user:User
        ):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user)
    }

    async getTaskById(id:number, user) : Promise<Task>{
        const found = await this.taskRepository.findOne({
            where:{
                id:id,
                userId:user.id
            }
        });
        
        if(!found) throw new NotFoundException(`Task with ID "${id}" not found`)

        return found
    }

    async createTask(createTaskDto: CreateTaskDto, user:User) : Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async deleteTaskById(id:number, user:User):Promise<void>{

        let result = await this.taskRepository.delete({id:id,userId:user.id})
        if(result.affected===0) throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    async updateTaskStatus(id: number, status:TaskStatus, user:User) : Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status
        await task.save();
        return task;
    }

}
