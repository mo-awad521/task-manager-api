import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  title: string;

  @IsOptional()
  description: string;
}
