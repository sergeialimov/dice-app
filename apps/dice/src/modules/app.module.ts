import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthController } from '../controllers/health.controller';
import { UserService } from '../services/user.service';
import { UserResolver } from '../resolvers/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [HealthController],
  providers: [
    UserService,
    UserResolver,
  ],
})
export class AppModule {}
