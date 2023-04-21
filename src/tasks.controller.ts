import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task from './task.model';
import { CreateTaskDtp } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getAll();
  }

  @Post()
  create(@Body() createTaskDtp: CreateTaskDtp): Task {
    return this.tasksService.create(createTaskDtp);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.tasksService.getById(id);
  }
}
