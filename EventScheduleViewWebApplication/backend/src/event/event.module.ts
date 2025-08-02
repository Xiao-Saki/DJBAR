import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EventDjModule } from '../event-dj/event-dj.module';

@Module({
  imports: [PrismaModule, EventDjModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
