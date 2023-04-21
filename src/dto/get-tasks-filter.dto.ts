import { TaskStatus } from 'src/task.model';

export class GetTasksFilterDto {
  search?: string;
  status?: TaskStatus;
}
