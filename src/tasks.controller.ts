import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task, { TaskStatus } from './task.model';
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

  @Patch('/:id')
  updateById(
    @Body('status') status: TaskStatus,
    @Param('id') id: string,
  ): Task | string {
    return this.tasksService.updateStatusById(id, status);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return this.tasksService.deleteById(id);
  }
}
