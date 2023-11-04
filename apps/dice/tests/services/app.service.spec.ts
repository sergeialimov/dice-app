import { Test } from '@nestjs/testing';

import { AppService } from '../../src/app/services/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello Dice API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello Dice API' });
    });
  });
});
