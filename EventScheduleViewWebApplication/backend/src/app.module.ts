import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BarModule } from './bar/bar.module';
import { DjModule } from './dj/dj.module';
import { EventModule } from './event/event.module';
import { EventDjModule } from './event-dj/event-dj.module';

@Module({
  imports: [UserModule, BarModule, DjModule, EventModule, EventDjModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
