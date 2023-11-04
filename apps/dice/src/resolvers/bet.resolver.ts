import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Bet, BetService, BetDto } from '@libs/storage';

@Resolver(of => BetDto)
export class BetResolver {
  constructor(private readonly betService: BetService) {}

  @Query(returns => BetDto)
  async bet(@Args('id', { type: () => Int }) id: number): Promise<Bet> {
    return this.betService.getBet(id);
  }

  @Query(returns => [BetDto])
  async bets(): Promise<Bet[]> {
    return this.betService.getBetList();
  }

  @Query(returns => [BetDto])
  async bestBetPerUser(
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<Bet[]> {
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
