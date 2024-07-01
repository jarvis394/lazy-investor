import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ShareService } from './share.service'
import { ShareGetListRes } from '@app/shared'
import { CacheInterceptor } from '@nestjs/cache-manager'

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/list')
  async getList(): Promise<ShareGetListRes> {
    return await this.shareService.getList()
  }
}
