import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/task.model';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
