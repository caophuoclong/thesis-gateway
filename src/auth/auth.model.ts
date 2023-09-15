import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { ObjectUnsubscribedError } from 'rxjs';

@ObjectType({
    description: 'Signin model',
})
export class SignInModel {
    @Field(() => String, { description: 'Access token' })
    token: string;
    @Field(() => String, { description: 'Refresh token' })
    refreshToken: string;
}
@ObjectType({
    description: 'Signup model',
})
export class SignUpModel {
    @Field(() => String, { description: 'Message while signup' })
    message: string;
}
@ObjectType({
    description: 'Login faild',
})
export class LoginFailed {
    @Field(() => String, { description: 'Message while signup' })
    message: string;
}
export const LoginResponse = createUnionType({
    name: 'LoginResponse',
    types: () => [Token, LoginFailed],
    resolveType(value) {
        if (value.message) {
            return LoginFailed;
        }
        return Token;
    },
});
@ObjectType({
    description: 'Object token',
})
export class Token {
    @Field(() => String, { description: 'Access token' })
    token: string;
}
