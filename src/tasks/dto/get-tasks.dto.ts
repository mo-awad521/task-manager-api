import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class GetTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
