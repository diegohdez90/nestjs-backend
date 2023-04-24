import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
class TaskRepository {
  constructor(private dataSource: DataSource) {}
}

export default TaskRepository;
