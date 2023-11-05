import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Bet, User } from '../models';
import { BetDto } from '../dtos';

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

  async getBestBetPerUser(limit: number): Promise<BetDto[]> {
    const bestBets = await this.betModel.findAll({
      attributes: [
        'id',
        'userId',
        'betAmount',
        'chance',
        'win',
        [Sequelize.fn('MAX', Sequelize.col('payout')), 'payout'],
      ],
      group: ['Bet.userId', 'Bet.id', 'Bet.betAmount', 'Bet.chance', 'Bet.win', 'user.id'],
      order: [[Sequelize.fn('MAX', Sequelize.col('payout')), 'DESC']],
      limit,
      include: [{
        model: User,
        attributes: ['id', 'name', 'balance'],
        on: Sequelize.where(Sequelize.col('Bet.userId'), '=', Sequelize.col('user.id'))
      }],
    });

    const res = bestBets.map(bet => {
      const betData = bet.dataValues;

      const user = betData.user ? betData.user.dataValues : null;

      const payout = betData.payout;

      return {
        id: betData.id,
        betAmount: betData.betAmount,
        chance: betData.chance,
        win: betData.win,
        userId: betData.userId,
        payout: payout,
        user: user ? {
          id: user.id,
          name: user.name,
          balance: user.balance,
        } : null,
      };
    });

    return res as BetDto[];
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
