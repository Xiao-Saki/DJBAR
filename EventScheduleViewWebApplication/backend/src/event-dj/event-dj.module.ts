import { Module } from '@nestjs/common';
import { EventDjService } from './event-dj.service';
import { EventDjController } from './event-dj.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventDjController],
  providers: [EventDjService],
  exports: [EventDjService],
})
export class EventDjModule {}
