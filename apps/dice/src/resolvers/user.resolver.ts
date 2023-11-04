import { Query, Resolver, Int, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Int)
  getUser(
    @Args('id', { type: () => Int }) id: number) {
    return this.userService.getUser(id).id;
  }
}
