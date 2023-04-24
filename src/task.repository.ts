import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filter: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filter;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', {
        status,
      });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}

export default TaskRepository;
