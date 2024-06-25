import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '../config/config.module'
import { PrismaModule } from 'nestjs-prisma'
import { ConfigService } from '../config/config.service'
import { TelegrafModule } from 'nestjs-telegraf'
import { BotModule } from '../bot/bot.module'

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
    BotModule,
  ],
  providers: [ConfigService],
  controllers: [AppController],
})
export class AppModule {}
