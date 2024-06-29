import { Module } from '@nestjs/common'
import { ConfigService } from '../config/config.service'
import { PulseController } from './pulse.controller'
import { PulseService } from './pulse.service'

@Module({
  providers: [ConfigService, PulseService],
  controllers: [PulseController],
})
export class PulseModule {}
