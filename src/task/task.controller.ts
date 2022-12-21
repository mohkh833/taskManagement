import { Controller, Get, Post ,Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from "./task-status-enum";
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    private logger = new Logger('TaskController')
    constructor(private taskService:TaskService ){}

    @Get()
    getAllTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user:User
    ){
        this.logger.verbose(`User "${user.username}" retrieving all tasks, filters: ${JSON.stringify(filterDto)}`)
        return this.taskService.getTasks(filterDto,user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ) :Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user:User
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id', ParseIntPipe) id: number, @GetUser() user:User): Promise<void> {
        return this.taskService.deleteTaskById(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id' , ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status:TaskStatus, @GetUser() user : User):Promise<Task>{
        return this.taskService.updateTaskStatus(id, status,user)
    }
}
