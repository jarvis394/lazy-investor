import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '../config/config.module'
import { PrismaModule } from 'nestjs-prisma'
import { ConfigService } from '../config/config.service'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotModule } from '../bot/bot.module'
import { PulseModule } from '../pulse/pulse.module'
import { ShareModule } from '../share/share.module'
import { redisStore } from 'cache-manager-redis-yet'
import { CacheModule } from '@nestjs/cache-manager'
import type { RedisClientOptions } from 'redis'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.TELEGRAM_BOT_KEY,
      }),
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          ttl: configService.CACHE_TTL,
          keyPrefix: configService.REDIS_KEY_PREFIX,
          url: configService.REDIS_URL,
        }),
      }),
    }),
    BotModule,
    PulseModule,
    ShareModule,
  ],
  providers: [ConfigService],
  controllers: [AppController],
})
export class AppModule {}
