import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  HttpCode,
} from '@nestjs/common'
import { PulseService } from './pulse.service'
import { PulseGetPageRes } from '@app/shared'
import { PulseGetPageDto } from './dto/pulse-get-page.dto'

@Controller('pulse')
export class PulseController {
  constructor(private readonly pulseService: PulseService) {}

  @HttpCode(200)
  @Post('/page/:page')
  async getPage(
    @Param('page') page: number,
    @Body() filterDto: PulseGetPageDto = {}
  ): Promise<PulseGetPageRes> {
    if (isNaN(Number(page))) {
      throw new BadRequestException('Page parameter is not a number')
    }

    return await this.pulseService.getPage(page, filterDto)
  }
}
