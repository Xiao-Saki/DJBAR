import { Test, TestingModule } from '@nestjs/testing';
import { EventDjService } from './event-dj.service';

describe('EventDjService', () => {
  let service: EventDjService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventDjService],
    }).compile();

    service = module.get<EventDjService>(EventDjService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
