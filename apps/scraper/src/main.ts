import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { AppService } from './app/app.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const appService = app.get(AppService)
  Logger.log('🚀 Telegram Scraper has started')
  await appService.startScraper()
  app.close()
  process.exit()
}

bootstrap()
