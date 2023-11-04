import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(id: number): { id: number } {
    return { id };
  }
}
