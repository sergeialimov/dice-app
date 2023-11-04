import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '../../src/controllers/health.controller';

describe('HealthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello Dice API"', () => {
      const healthController = app.get<HealthController>(HealthController);
      expect(healthController.checkHealth()).toEqual('OK');
    });
  });
});
