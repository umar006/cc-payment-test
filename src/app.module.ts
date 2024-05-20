import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
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
  providers: [AppService, drizzleProvider],
})
export class AppModule {}
