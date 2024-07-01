import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from './config/config.service'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  const config = app.get(ConfigService)
  const { httpAdapter } = app.get(HttpAdapterHost)
  const globalPrefix = 'api'

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  app.enableCors({
    origin: '*',
  })

  await app.listen(config.PORT, '0.0.0.0')
  const url = await app.getUrl()

  Logger.log(`🚀 Application is running on: ${url}/${globalPrefix}/v1`)
}

bootstrap()
