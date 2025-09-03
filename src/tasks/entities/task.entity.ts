// src/products/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'tasks' }) // Mapeia para uma tabela chamada 'products'
export class TaskEntity {
  @PrimaryGeneratedColumn() // Define como chave primária com auto-incremento
  id: number;

  @Column({ length: 100 }) // Define uma coluna do tipo string (varchar)
  name: string;

  @Column({ length: 255 }) // Define uma coluna do tipo string (varchar)
  description: string;

  @CreateDateColumn({ name: 'created_at' }) // Coluna que armazena a data de criação
  createdAt: Date;
}