import { Module } from '@nestjs/common';
import { DjController } from './dj.controller';
import { DjService } from './dj.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DjController],
  providers: [DjService],
  exports: [DjService],
})
export class DjModule {}
