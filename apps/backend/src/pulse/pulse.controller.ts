import { Controller, Get, Param } from '@nestjs/common'
import { PulseService } from './pulse.service'
import { PulseGetPageRes } from '@app/shared'

@Controller('pulse')
export class PulseController {
  constructor(private readonly pulseService: PulseService) {}

  @Get('/page/:page')
  async getPage(@Param('page') page: number): Promise<PulseGetPageRes> {
    return await this.pulseService.getPage(page)
  }
}
