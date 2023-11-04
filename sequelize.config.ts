import { SequelizeOptions } from 'sequelize-typescript';

// TODO: Configure with @Nest/config
const config: { [key: string]: SequelizeOptions } = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'dice',
    password: 'dice',
    database: 'dice',
  },
  // other environments
};

module.exports = config;
