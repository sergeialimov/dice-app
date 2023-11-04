import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Bet } from './models/bet.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      models: [User, Bet],
      autoLoadModels: true,
      synchronize: true, // For development only!
    }),
  ],
})
export class StorageModule {}
