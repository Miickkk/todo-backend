// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

interface FindAllOptions {
  page: number;
  limit: number;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<TaskEntity> {
    // Cria a task associada ao usuário logado
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user: { id: userId } as any, // associação ManyToOne no entity
      status: createTaskDto.status as TaskEntity['status'],
    });
    return await this.taskRepository.save(newTask);
  }

  async findAll(options: FindAllOptions): Promise<PaginationResponseDto<TaskEntity>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;
    const [data, total] = await this.taskRepository.findAndCount({
      skip,
      take: limit,
      relations: ['user'], // para trazer dados do usuário
      order: { createdAt: 'DESC' },
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID #${id} não encontrada.`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
      status: updateTaskDto.status as TaskEntity['status'],
    });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID #${id} não encontrada para atualizar.`);
    }
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}