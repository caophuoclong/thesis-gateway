import {
    Args,
    Context,
    GraphQLExecutionContext,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';
import {
    LoginFailed,
    LoginResponse,
    SignInModel,
    SignUpModel,
    Token,
} from './auth.model';
import { Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserInput } from './dto/login-user-input';
import { LocalGuard } from './local.guard';

@Resolver()
export class AuthResolver {
    constructor(
        @Inject('USER_SERVICE')
        private readonly userService: ClientProxy,
        private readonly authService: AuthService,
    ) {}
    @Mutation(() => SignUpModel)
    async signUp(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('first_name') first_name: string,
        @Args('username') username: string,
    ): Promise<Observable<SignUpModel>> {
        const data = {
            email,
            password,
            first_name,
            username,
        };
        return this.userService.send({ cmd: 'createUser' }, data);
    }
    @Mutation(() => LoginResponse)
    @UseGuards(LocalGuard)
    async signIn(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Context('res') res: Response,
        @Context('req') req: Request,
    ): Promise<Token | LoginFailed> {
        const user = req.user;
        console.log(
            '🚀 ~ file: auth.resolver.ts:52 ~ AuthResolver ~ user:',
            user,
        );
        // res.cookie(
        //     'refreshToken',
        //     await this.authService.generateToken({
        //         id: xyz.id,
        //         username: xyz.username,
        //     }),
        //     {
        //         httpOnly: true,
        //         maxAge: 1000 * 60 * 60 * 24 * 30,
        //     },
        // );
        const token = await this.authService.generateToken({
            id: 'xyz.id',
            username: 'xyz.username',
            email: 'xyz.email',
        });
        return {
            token,
        };
    }
    @Query(() => Token)
    async refreshToken(@Context('req') req: Request) {
        const token = req;
        return {
            token: await this.authService.generateToken({
                id: 'user.id',
                username: 'user.username',
                email: 'user.email',
            }),
        };
    }
}
