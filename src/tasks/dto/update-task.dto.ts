import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(10)
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
