import { Field, ObjectType, ID } from '@nestjs/graphql';
enum Gender {
    male = 'male',
    female = 'female',
}
@ObjectType({
    description: 'User model',
})
export class UserModel {
    @Field((type) => ID)
    id: string;
    @Field((type) => String, { description: 'Email of user' })
    email: string;
    @Field((type) => String, { description: 'First name of user' })
    first_name: string;
    @Field((type) => String, { description: 'Username of user' })
    username: string;
    @Field((type) => String, { description: 'Password of user' })
    password: string;
    @Field((type) => String, { description: 'Last name' })
    last_name: string;
    @Field((type) => String, { description: 'Phone number' })
    phone_number: string;
    @Field((type) => Number, { description: 'Created At' })
    createdAt: number;
    @Field((type) => Number, { description: 'Updated At' })
    updatedAt: number;
    @Field((type) => Number, { description: 'DOB' })
    dob: number;
    @Field((type) => String, { description: 'Avatar' })
    avatar: string;
    @Field((type) => String, { description: 'Cover' })
    cover: string;
    @Field((type) => String, { description: 'Gender' })
    gender: Gender;
}
