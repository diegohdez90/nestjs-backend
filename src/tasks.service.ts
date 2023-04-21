import { Injectable } from '@nestjs/common';
import Task, { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDtp } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAll() {
    return this.tasks;
  }

  create(createTaskDtp: CreateTaskDtp): Task {
    const task: Task = {
      id: uuid(),
      title: createTaskDtp.title,
      description: createTaskDtp.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
