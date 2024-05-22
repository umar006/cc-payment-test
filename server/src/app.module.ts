import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import databaseConfig from './database/database.config';
import { DatabaseModule } from './database/database.module';
import { PaymentService } from './third-party/payment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaymentService, AppRepository],
})
export class AppModule {}
