import { ShareGetListRes } from '@app/shared'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ShareService {
  constructor(private readonly prismaService: PrismaService) {}

  async getList(): Promise<ShareGetListRes> {
    const tags = await this.prismaService.pulse.findMany({
      select: {
        shareTag: true,
      },
    })

    const uniqueTags: Set<string> = new Set()
    const uniqueTagsArray: string[] = []

    tags.forEach((e) => {
      const tag = e.shareTag
      if (!tag) return
      if (!uniqueTags.has(tag)) {
        uniqueTags.add(tag)
      }
    })

    uniqueTags.forEach((e) => uniqueTagsArray.push(e))

    return {
      tags: uniqueTagsArray,
      count: uniqueTags.size,
    }
  }
}
