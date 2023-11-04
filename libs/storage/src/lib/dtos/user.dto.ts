import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => Float)
  balance: number;

}
