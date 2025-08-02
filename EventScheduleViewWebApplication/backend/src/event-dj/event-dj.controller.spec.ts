import { Test, TestingModule } from '@nestjs/testing';
import { EventDjController } from './event-dj.controller';

describe('EventDjController', () => {
  let controller: EventDjController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventDjController],
    }).compile();

    controller = module.get<EventDjController>(EventDjController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
