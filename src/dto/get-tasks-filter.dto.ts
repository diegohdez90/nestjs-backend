import { IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/task.model';

export class GetTasksFilterDto {
  @IsOptional()
  search?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
