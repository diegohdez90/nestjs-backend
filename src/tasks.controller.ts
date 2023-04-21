import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task, { TaskStatus } from './task.model';
import { CreateTaskDtp } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilter: GetTasksFilterDto): Task[] {
    if (Object.keys(getTasksFilter).length) {
      return this.tasksService.getByFilter(getTasksFilter);
    }
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
    @Body() updateTask: UpdateTaskDto,
    @Param('id') id: string,
  ): Task | string {
    return this.tasksService.updateStatusById(id, updateTask);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return this.tasksService.deleteById(id);
  }
}
