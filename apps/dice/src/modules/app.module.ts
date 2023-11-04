import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DiceResolver } from '../resolvers/dice.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DiceResolver,
  ],
})
export class AppModule {}
