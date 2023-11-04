import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bet, User } from './models';
import { UserService, BetService } from './services';
import { BetType } from './dtos';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dice',
      password: 'dice',
      database: 'dice',
      models: [User, Bet],
      // services: [UserService, BetService],
      // dtos: [BetType],
      autoLoadModels: true,
      synchronize: true, // For development only!
    }),
  ],
})
export class StorageModule {}
