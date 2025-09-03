// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // ou 127.0.0.1
      port: 3306,
      username: 'root',
      password: '1234', // <-- MUITO IMPORTANTE: Coloque a senha que você configurou na instalação do MySQL
      database: 'tasks', // O nome do banco que criamos no Workbench
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Encontra as entidades automaticamente
      synchronize: true, // Apenas para desenvolvimento! Cria as tabelas automaticamente.
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}