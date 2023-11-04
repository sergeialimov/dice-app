import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Bet extends Model<Bet> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.FLOAT)
  betAmount: number;

  @Column(DataType.FLOAT)
  chance: number;

  @Column(DataType.FLOAT)
  payout: number;

  @Column(DataType.BOOLEAN)
  win: boolean;

  @BelongsTo(() => User)
  user: User;
}
