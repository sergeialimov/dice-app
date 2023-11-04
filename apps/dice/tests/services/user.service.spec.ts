import { Test } from '@nestjs/testing';

import { UserService } from '../../src/services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = app.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return user', () => {
      expect(service.getUser(12)).toEqual({ id: 12 });
    });
  });
});
