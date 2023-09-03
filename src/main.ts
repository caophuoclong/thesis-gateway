import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestFactory.create() creates an instance of the NestApplication class.
  app.listen(4010);
}
bootstrap();
