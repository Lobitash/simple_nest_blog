import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder , SwaggerModule } from '@nestjs/swagger'

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('Simple Blog API')
  .setDescription('API documentation for my simple nestjs blog project')
  .setVersion('1.0')
  .addTag('Cats')
  .addBearerAuth()
  .build();

  const document = () => SwaggerModule.createDocument(app , config);
  SwaggerModule.setup('api', app , document)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
