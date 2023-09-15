import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    name: 'USER_SERVICE',
                    useFactory: (configService: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get('rabbitmq') as string],
                                queue: 'user_queue',
                            },
                        };
                    },
                    inject: [ConfigService],
                },
            ],
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    global: true,
                    secret: configService.get('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.expiresIn'),
                    },
                };
            },
        }),
        // PassportModule,
    ],
    providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
