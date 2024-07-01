import { PulseGetPageRes } from '@app/shared'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { PulseGetPageDto } from './dto/pulse-get-page.dto'
import { Prisma } from '@prisma/client'
import { ConfigService } from '../config/config.service'

@Injectable()
export class PulseService {
  static DEFAULT_GET_LIST_LIMIT = 12

  pulsesCount = -1
  pulsesPagesCount = -1

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  getCacheKey(page: number, filter: PulseGetPageDto) {
    const res: string[] = [`page(${page})`]

    if (filter.shareTag) {
      res.push(`filter.shareTag(${filter.shareTag})`)
    }

    if (filter.search) {
      res.push(`filter.search(${filter.search})`)
    }

    return 'pulses:' + res.join('_')
  }

  async getPage(
    page: number,
    filter: PulseGetPageDto
  ): Promise<PulseGetPageRes> {
    const currentPage = page - 1

    if (currentPage < 0) {
      throw new BadRequestException('Page number should be higher than 1')
    }

    const cacheResult = await this.cacheManager.get<PulseGetPageRes>(
      this.getCacheKey(page, filter)
    )

    // Return cached result if found
    // We update cache in `bot` module
    if (cacheResult) return cacheResult

    let whereCondition: Prisma.PulseWhereInput = {}

    if (filter.shareTag) {
      whereCondition = { shareTag: filter.shareTag }
    } else if (filter.search) {
      whereCondition = {
        OR: [
          {
            shareTag: { contains: filter.search, mode: 'insensitive' },
          },
          {
            share: { contains: filter.search, mode: 'insensitive' },
          },
        ],
      }
    }

    const [pulses, count] = await this.prismaService.$transaction([
      this.prismaService.pulse.findMany({
        where: whereCondition,
        orderBy: { telegramId: 'desc' },
        take: PulseService.DEFAULT_GET_LIST_LIMIT,
        skip: currentPage * PulseService.DEFAULT_GET_LIST_LIMIT,
      }),
      this.prismaService.pulse.count({
        where: whereCondition,
      }),
    ])
    const pages = Math.ceil(count / PulseService.DEFAULT_GET_LIST_LIMIT)
    const res: PulseGetPageRes = {
      pulses,
      count,
      pages,
      filter,
    }

    await this.cacheManager.set(this.getCacheKey(page, filter), res)

    return res
  }
}
