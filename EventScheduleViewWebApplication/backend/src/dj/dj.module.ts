import { Module } from '@nestjs/common';
import { DjService } from './dj.service';
import { DjController } from './dj.controller';

@Module({
  controllers: [DjController],
  providers: [DjService],
})
export class DjModule {}
