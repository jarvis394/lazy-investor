import { Controller, Get } from '@nestjs/common'
import { ShareService } from './share.service'
import { ShareGetListRes } from '@app/shared'

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Get('/list')
  async getList(): Promise<ShareGetListRes> {
    return await this.shareService.getList()
  }
}
