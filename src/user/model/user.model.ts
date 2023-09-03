import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({
    description: 'User model',
})
export class UserModel {
    @Field((type) => ID)
    id: string;
}
