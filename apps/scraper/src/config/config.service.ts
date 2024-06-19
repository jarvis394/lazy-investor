import { Injectable } from '@nestjs/common'
import { ConfigService as BaseConfigService } from '@nestjs/config'

type EnvSchema = {
  PORT: string
  DATABASE_URL: string
  TELEGRAM_BOT_KEY: string
  TELEGRAM_SESSION_KEY: string
  TELEGRAM_APP_ID: string
  TELEGRAM_APP_HASH: string
}

@Injectable()
export class ConfigService {
  constructor(private configService: BaseConfigService<EnvSchema>) {}

  get PORT() {
    return this.configService.get('PORT') || 6000
  }

  get DATABASE_URL() {
    return this.configService.getOrThrow('DATABASE_URL')
  }

  get TELEGRAM_BOT_KEY() {
    return this.configService.getOrThrow('TELEGRAM_BOT_KEY')
  }

  get TELEGRAM_SESSION_KEY() {
    return this.configService.getOrThrow('TELEGRAM_SESSION_KEY')
  }

  get TELEGRAM_APP_ID() {
    return Number(this.configService.getOrThrow('TELEGRAM_APP_ID'))
  }

  get TELEGRAM_APP_HASH() {
    return this.configService.getOrThrow('TELEGRAM_APP_HASH')
  }
}
