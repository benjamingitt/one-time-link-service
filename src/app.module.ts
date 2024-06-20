import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkModule } from './link/link.module';
import { RedisModule } from '../libs/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    LinkModule,
  ],
})
export class AppModule {}
