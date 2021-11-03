import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrinksModule } from './drinks/drinks.module';

@Module({
  imports: [DrinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
