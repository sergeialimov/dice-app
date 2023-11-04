import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '../../src/controllers/health.controller';
import { AppService } from '../../src/services/app.service';

describe('HealthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello Dice API"', () => {
      const healthController = app.get<HealthController>(HealthController);
      expect(healthController.checkHealth()).toEqual('OK');
    });
  });
});
