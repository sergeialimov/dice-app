import { Query, Resolver, Int, Args } from '@nestjs/graphql';
import { UserService, UserDto } from '@libs/storage';

@Resolver(of => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto, { nullable: true })
  async getUser(
    @Args('id', { type: () => Int }) id: number,
    ): Promise<UserDto | null> {
    const user = await this.userService.getUser(id);

    return user;
  }

  @Query(() => [UserDto])
  async getUserList(): Promise<UserDto[]> {
    const users = await this.userService.getUserList();

    return users;
  }
}


