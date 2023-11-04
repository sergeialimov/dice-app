import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bet, User } from './models';
import { UserService, BetService } from './services';

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
      autoLoadModels: true,
      synchronize: true, // For development only!
    }),
    SequelizeModule.forFeature([User, Bet]),
  ],
  providers: [
    UserService,
    BetService,
  ],
  exports: [
    UserService,
    BetService,
    // SequelizeModule,
  ],
})
export class StorageModule {}
