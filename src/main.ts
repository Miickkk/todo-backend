import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe()); 
  app.useGlobalFilters(new HttpExceptionFilter()); 
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
