import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserDatabase } from './resources/user/user.database';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, UserDatabase],
})
export class AppModule {}
