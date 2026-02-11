import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/entities/user.entity';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, user: User) {
    const task = this.taskRepo.create({
      ...dto,
      user,
    });

    return this.taskRepo.save(task);
  }
  async findAll(query: GetTasksDto, user: User) {
    const { status, page = '1', limit = '10' } = query;

    const queryBuilder = this.taskRepo
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: user.id });

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    const skip = (Number(page) - 1) * Number(limit);

    queryBuilder
      .skip(skip)
      .take(Number(limit))
      .orderBy('task.createdAt', 'DESC');

    const [tasks, total] = await queryBuilder.getManyAndCount();

    return {
      data: tasks,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  async findOne(id: number, user: User) {
    const task = await this.taskRepo.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not Found');
    }

    return task;
  }

  async update(id: number, dto: UpdateTaskDto, user: User) {
    const task = await this.findOne(id, user);

    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }

  async remove(id: number, user: User) {
    const task = await this.findOne(id, user);

    await this.taskRepo.remove(task);

    return {
      message: 'Task deleted Successulfy',
    };
  }
}
