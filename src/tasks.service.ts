import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDtp } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import TaskRepository from './task.repository';

@Injectable()
export class TasksService {
  constructor(@Inject(TaskRepository)
    private readonly repository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAll() {
  //   return this.tasks;
  // }

  // getByFilter(filter: GetTasksFilterDto): Task[] {
  //   const { status, search } = filter;
  //   let tasks = this.getAll();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.description.includes(search) || task.title.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async create(createTaskDtp: CreateTaskDtp): Promise<Task> {
    const { title, description } = createTaskDtp;
    const task = this.repository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.repository.save(task);
    return task;
  }

  async getById(id: string): Promise<Task> {
    const task = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found!');
    }
    return task;
  }

  // updateStatusById(id: string, updateTask: UpdateTaskDto): Task {
  //   const { status } = updateTask;
  //   const index = this.tasks.findIndex((task) => task.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException('Task not found to be updated!');
  //   }
  //   this.tasks[index].status = status;
  //   return this.tasks[index];
  // }

  // deleteById(id: string): string {
  //   const index = this.tasks.findIndex((task) => task.id === id);
  //   if (index > -1) {
  //     this.tasks.splice(index, 1);
  //     return 'Task deleted';
  //   }
  //   throw new NotFoundException('Task not found to be delete!');
  // }
}
