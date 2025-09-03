//products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  /**
   * O construtor injeta o repositório do TypeORM para a entidade ProductEntity.
   * A partir de agora, `this.productRepository` pode ser usado para executar
   * operações de banco de dados na tabela 'products'.
   * @param productRepository - O repositório injetado para a entidade Product.
   */
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  /**
   * Cria um novo produto no banco de dados.
   * @param createProductDto - O DTO com os dados para criar o novo produto.
   * @returns A entidade do produto recém-criado.
   */
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    // Cria uma instância da entidade com base no DTO, mas ainda não salva no banco.
    const newTask = this.taskRepository.create(createTaskDto);
    // Salva a entidade no banco de dados e retorna o resultado.
    return await this.taskRepository.save(newTask);
  }

  /**
   * Busca e retorna todos os produtos do banco de dados.
   * @returns Uma lista (array) de todas as entidades de produto.
   */
  async findAll(): Promise<TaskEntity[]> {
    // .find() sem argumentos retorna todos os registros da tabela.
    return await this.taskRepository.find();
  }

  /**
   * Busca um único produto pelo seu ID.
   * @param id - O ID do produto a ser encontrado.
   * @returns A entidade do produto encontrado.
   * @throws {NotFoundException} se nenhum produto com o ID fornecido for encontrado.
   */
  async findOne(id: number): Promise<TaskEntity> {
    // .findOneBy() busca o primeiro registro que corresponde aos critérios.
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task com ID #${id} não encontrado.`);
    }

    return task;
  }

  /**
   * Atualiza os dados de um produto existente.
   * @param id - O ID do produto a ser atualizado.
   * @param updateTaskDto - O DTO com os dados a serem atualizados.
   * @returns A entidade do produto com os dados atualizados.
   * @throws {NotFoundException} se o produto a ser atualizado não for encontrado.
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    // .preload() encontra a entidade pelo ID e mescla os novos dados do DTO nela.
    // Retorna a entidade mesclada, mas ainda não salva.
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Task com ID #${id} não encontrado para atualizar.`);
    }

    // Salva a entidade atualizada de volta no banco de dados.
    return await this.taskRepository.save(task);
  }

  /**
   * Remove um produto do banco de dados pelo seu ID.
   * @param id - O ID do produto a ser removido.
   * @returns Uma promessa vazia (void) após a remoção.
   * @throws {NotFoundException} se o produto a ser removido não for encontrado.
   */
  async remove(id: number): Promise<void> {
    // Reutilizamos o método findOne para garantir que o produto exista antes de tentar removê-lo.
    // Isso também aciona a NotFoundException se ele não existir.
    const task = await this.findOne(id);

    // .remove() exclui a entidade do banco de dados.
    await this.taskRepository.remove(task);
  }
}