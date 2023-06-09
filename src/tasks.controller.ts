import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDtp } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './dto/get-user.decorator';
import User from './user/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilter: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getAll(getTasksFilter);
  }

  @Post()
  create(
    @GetUser() user: User,
    @Body() createTaskDtp: CreateTaskDtp,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDtp, user);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Patch('/:id')
  updateById(
    @Body() updateTask: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.updateStatusById(id, updateTask);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.deleteById(id);
  }
}
