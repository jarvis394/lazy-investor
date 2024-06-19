import { Logger, Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule } from '../config/config.module'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
  ],
  providers: [ConfigService, AppService],
})
export class AppModule {}
