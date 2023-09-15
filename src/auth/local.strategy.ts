import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('USER_SERVICE')
        private readonly userService: ClientProxy,
    ) {
        super();
    }
    async validate(username: string, password: string) {
        const user = await this.userService
            .send({ cmd: 'login' }, { username, password })
            .toPromise();
        if (user.error) {
            throw new UnauthorizedException(user.error);
        }
        return user.data;
    }
}
