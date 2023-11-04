import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Bet, User } from '../models';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(Bet)
    private readonly betModel: typeof Bet,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async getBet(id: number): Promise<Bet | null> {
    return this.betModel.findByPk(id, { include: [User] });
  }

  async getBetList(): Promise<Bet[]> {
    return this.betModel.findAll({ include: [User] });
  }

  async getBestBetPerUser(limit: number): Promise<Bet[]> {
    const bestBets = await this.betModel.findAll({
      attributes: [
        'userId',
        [Sequelize.fn('MAX', Sequelize.col('payout')), 'bestPayout'],
      ],
      group: ['userId'],
      order: [[Sequelize.col('bestPayout'), 'DESC']],
      limit: limit,
      include: [{ model: User, attributes: ['name'] }],
    });

    return bestBets as unknown as Bet[];
  }

  async createBet(userId: number, betAmount: number, chance: number): Promise<Bet> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new Error('User not found.');
    if (user.balance < betAmount) throw new Error('Insufficient balance.');

    const transaction = await this.betModel.sequelize.transaction();

    try {
      const win = Math.random() < chance;
      const payout = win ? betAmount / chance : 0;

      const bet = new this.betModel({
        userId,
        betAmount,
        chance,
        payout,
        win,
      });

      await bet.save({ transaction });

      user.balance += payout - betAmount;
      await user.save({ transaction });

      await bet.reload({
        include: [{
          model: User,
        }],
        transaction,
      });

      await transaction.commit();

      return bet;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
