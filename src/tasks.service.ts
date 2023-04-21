import { Injectable } from '@nestjs/common';
import Task, { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAll() {
    return this.tasks;
  }

  create(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
