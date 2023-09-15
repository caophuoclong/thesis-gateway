import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule); // NestFactory.create() creates an instance of the NestApplication class.
    app.use(cookieParser());
    app.listen(4010);
}
bootstrap();
