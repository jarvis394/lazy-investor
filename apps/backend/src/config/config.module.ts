import { Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigModule as BaseConfigModule } from '@nestjs/config'

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends BaseConfigModule {}
