import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe, // Pipe para transformar e validar o ID
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

/**
 * O Controller é responsável por receber as requisições HTTP,
 * delegar a lógica de negócio para o Service e retornar a resposta.
 * O decorator @Controller('products') define '/products' como o prefixo de rota
 * para todos os endpoints definidos nesta classe.
 */
@Controller('tasks')
export class TasksController {
  /**
   * O construtor injeta a instância do ProductsService,
   * permitindo que o controller utilize seus métodos.
   * @param productsService - A instância do serviço de produtos.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Rota para criar um novo produto.
   * Mapeado para o método HTTP POST em '/products'.
   * O @Body() decorator extrai os dados do corpo da requisição e os valida
   * usando o CreateProductDto.
   * @param createTaskDto - Dados para a criação do produto.
   * @returns O produto recém-criado.
   */
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    return await this.tasksService.create(createTaskDto);
  }

  /**
   * Rota para listar todos os produtos.
   * Mapeado para o método HTTP GET em '/products'.
   * @returns Uma lista de todos os produtos.
   */
  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return await this.tasksService.findAll();
  }

  /**
   * Rota para buscar um produto específico pelo seu ID.
   * Mapeado para o método HTTP GET em '/products/:id'.
   * O @Param('id', ParseIntPipe) extrai o ID da URL,
   * e o ParseIntPipe o transforma de string para número, além de validar se é um número inteiro.
   * @param id - O ID do produto a ser buscado.
   * @returns O produto encontrado.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    // O ParseIntPipe já fez a conversão de string para number
    return await this.tasksService.findOne(id);
  }

  /**
   * Rota para atualizar um produto existente.
   * Mapeado para o método HTTP PUT em '/products/:id'.
   * @param id - O ID do produto a ser atualizado.
   * @param updateTaskDto - Os dados para atualização.
   * @returns O produto com os dados atualizados.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Rota para remover um produto.
   * Mapeado para o método HTTP DELETE em '/products/:id'.
   * O decorator @HttpCode(HttpStatus.NO_CONTENT) faz com que a resposta
   * retorne o status 204 (No Content) em caso de sucesso, que é a convenção
   * para operações de exclusão bem-sucedidas.
   * @param id - O ID do produto a ser removido.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }
}