import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { Client, ClientProxy, ClientRMQ } from '@nestjs/microservices';
import { Inject, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserModel)
export class UserResolver {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}
    @Query(() => UserModel)
    getMe(@Context('req') req: Request): Observable<{}> {
        const { user } = req;
        return this.client.send({ cmd: 'getUser' }, user.id);
    }
}
