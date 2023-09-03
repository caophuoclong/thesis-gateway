import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, buildSchema } from 'graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: (userService: UserService) => {
                return {
                    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                    context: ({ req }) => {
                        const headers = req.headers;
                        const authorization = headers.authorization;
                        if (authorization) {
                        }
                        throw new GraphQLError('Unauthorized');
                    },
                };
            },
            inject: [UserModule],
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
