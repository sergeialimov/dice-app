import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthController } from '../controllers/health.controller';
import { StorageModule } from '@libs/storage';
import { UserResolver, BetResolver } from '../resolvers/';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    StorageModule,
  ],
  controllers: [HealthController],
  providers: [
    UserResolver,
    BetResolver,
  ],
})
export class AppModule {}
