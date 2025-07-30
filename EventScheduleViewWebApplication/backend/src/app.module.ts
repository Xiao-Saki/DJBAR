import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BarModule } from './bar/bar.module';
import { DjModule } from './dj/dj.module';

@Module({
  imports: [UserModule, BarModule, DjModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
