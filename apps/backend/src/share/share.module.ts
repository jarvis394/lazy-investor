import { Module } from '@nestjs/common'
import { ConfigService } from '../config/config.service'
import { ShareController } from './share.controller'
import { ShareService } from './share.service'

@Module({
  providers: [ConfigService, ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
