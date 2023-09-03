import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { Client, ClientProxy, ClientRMQ } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

@Resolver(() => UserModel)
export class UserResolver {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}
    @Query(() => UserModel)
    getUser(@Args('id') id: string): Observable<{
        id: string;
    }> {
        return this.client.send({ cmd: 'getUser' }, '123');
    }
}
