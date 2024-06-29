import { Controller, Get, Param, Query } from '@nestjs/common'
import { PulseService } from './pulse.service'
import { PulseGetPageRes } from '@app/shared'

@Controller('pulse')
export class PulseController {
  constructor(private readonly pulseService: PulseService) {}

  @Get('/page/:page')
  async getPage(
    @Param('page') page: number,
    @Query('filter') filter: string
  ): Promise<PulseGetPageRes> {
    return await this.pulseService.getPage(page, filter)
  }
}
