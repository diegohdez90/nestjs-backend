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

  getById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateStatusById(id: string, status: TaskStatus): Task | string {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return 'Task cannot be found';
    }
    this.tasks[index].status = status;
    return this.tasks[index];
  }

  deleteById(id: string): string {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      return 'Task deleted';
    }
    return 'Task cannot be found';
  }
}
