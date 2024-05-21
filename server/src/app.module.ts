import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import databaseConfig from './database.config';
import { drizzleProvider } from './drizzle.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository, drizzleProvider],
})
export class AppModule {}
