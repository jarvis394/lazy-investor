import { Injectable } from '@nestjs/common'
import { ConfigService as BaseConfigService } from '@nestjs/config'

type EnvSchema = {
  PORT: string
  DATABASE_URL: string
  REDIS_URL: string
  CACHE_TTL: string
  TELEGRAM_BOT_KEY: string
}

@Injectable()
export class ConfigService {
  constructor(private configService: BaseConfigService<EnvSchema>) {}

  get PORT() {
    return this.configService.get('PORT') || 5000
  }

  get DATABASE_URL() {
    return this.configService.getOrThrow('DATABASE_URL')
  }

  get TELEGRAM_BOT_KEY() {
    return this.configService.getOrThrow('TELEGRAM_BOT_KEY')
  }

  get CACHE_TTL() {
    return Number(this.configService.get('CACHE_TTL')) || 60
  }

  get REDIS_URL() {
    return this.configService.getOrThrow('REDIS_URL')
  }
}
