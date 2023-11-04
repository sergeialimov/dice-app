import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from '../models';

@ObjectType()
export class BetDto {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  userId: number;

  @Field(type => Float)
  betAmount: number;

  @Field(type => Float)
  chance: number;

  @Field(type => Float)
  payout: number;

  @Field(type => Boolean)
  win: boolean;

  @Field(type => User)
  user: User;
}
