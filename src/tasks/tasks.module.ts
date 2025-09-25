import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity'; //importar a entidade

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])], //Registrar a entidade no modulo
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
