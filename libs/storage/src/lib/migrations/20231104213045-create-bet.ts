// YYYYMMDDHHMMSS-create-bet.ts
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('bets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      betAmount: {
        type: DataTypes.FLOAT
      },
      chance: {
        type: DataTypes.FLOAT
      },
      payout: {
        type: DataTypes.FLOAT
      },
      win: {
        type: DataTypes.BOOLEAN
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('bets');
  }
};
