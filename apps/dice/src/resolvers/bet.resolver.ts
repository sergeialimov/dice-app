import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Bet, BetService, BetDto } from '@libs/storage';

@Resolver(of => BetDto)
export class BetResolver {
  constructor(private readonly betService: BetService) {}

  @Query(returns => BetDto)
  async getBet(@Args('id', { type: () => Int }) id: number): Promise<Bet | null> {
    return this.betService.getBet(id);
  }

  @Query(returns => [BetDto])
  async getBetList(): Promise<Bet[]> {
    return this.betService.getBetList();
  }

  @Query(returns => [BetDto])
  async getBestBetPerUser(@Args('limit', { type: () => Int }) limit: number): Promise<BetDto[]> {
    return this.betService.getBestBetPerUser(limit);
  }

  @Mutation(returns => BetDto)
  async createBet(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('betAmount', { type: () => Float }) betAmount: number,
    @Args('chance', { type: () => Float }) chance: number,
  ): Promise<Bet> {
    return this.betService.createBet(userId, betAmount, chance);
  }
}
