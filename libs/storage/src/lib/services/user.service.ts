import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getUser(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async getUserList(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
