import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getAll();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.create(title, description);
  }
}
