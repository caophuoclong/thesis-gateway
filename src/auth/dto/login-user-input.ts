import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field(() => String, { description: 'User name' })
    username: string;
    @Field(() => String, { description: 'Password' })
    password: string;
}
