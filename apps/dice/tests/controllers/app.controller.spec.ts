import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../../src/controllers/app.controller';
import { AppService } from '../../src/services/app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello Dice API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello Dice API' });
    });
  });
});
