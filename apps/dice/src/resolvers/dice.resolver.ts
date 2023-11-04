import { Query, Resolver, Int } from '@nestjs/graphql';

@Resolver()
export class DiceResolver {
  @Query(() => Int)
  test(): number {
    return 1;
  }
}
