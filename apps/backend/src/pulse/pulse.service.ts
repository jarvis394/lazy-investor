import { PulseGetPageRes } from '@app/shared'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class PulseService {
  static DEFAULT_GET_LIST_LIMIT = 12

  pulsesCount = -1
  pulsesPagesCount = -1

  constructor(private readonly prismaService: PrismaService) {}

  async getPage(page: number, filter: string): Promise<PulseGetPageRes> {
    const currentPage = page - 1

    if (currentPage < 0) {
      throw new BadRequestException('Page number should be higher than 1')
    }

    const whereCondition = filter ? { shareTag: filter } : {}
    const pulses = await this.prismaService.pulse.findMany({
      where: whereCondition,
      orderBy: { telegramId: 'desc' },
      take: PulseService.DEFAULT_GET_LIST_LIMIT,
      skip: currentPage * PulseService.DEFAULT_GET_LIST_LIMIT,
    })

    const count = await this.prismaService.pulse.count({
      where: whereCondition,
    })
    const pulsesPagesCount = Math.ceil(
      count / PulseService.DEFAULT_GET_LIST_LIMIT
    )

    this.pulsesCount = count
    this.pulsesPagesCount = pulsesPagesCount

    return {
      pulses,
      count: this.pulsesCount,
      pages: this.pulsesPagesCount,
    }
  }
}
