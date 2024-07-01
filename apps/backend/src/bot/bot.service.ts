import { processTelegrafChannelMessage } from '@app/shared'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Pulse } from '@prisma/client'
import { Update as TelegrafUpdate, Message } from '@telegraf/types'
import { PrismaService } from 'nestjs-prisma'
import { Update, Ctx, On } from 'nestjs-telegraf'
import { Context as TelegrafContext } from 'telegraf'

type PulseWithoutId = Omit<Pulse, 'id'>

@Update()
@Injectable()
export class BotService {
  static SCRAPER_NAME = 'main'
  private readonly logger = new Logger(BotService.name)

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async savePulse(pulse: PulseWithoutId) {
    return await this.prismaService.pulse.create({
      data: {
        ...pulse,
        telegramId: 9000 + pulse.telegramId,
      },
    })
  }

  @On('channel_post')
  async onChannelPost(
    @Ctx()
    ctx: TelegrafContext<TelegrafUpdate.ChannelPostUpdate<Message.TextMessage>>
  ) {
    const message = ctx.channelPost
    this.logger.debug(`Got new post from channel (id: ${message.message_id})`)

    const processedMessage = await processTelegrafChannelMessage(message)

    this.logger.debug('Channel post successfully processed')

    if (!processedMessage) {
      this.logger.error(
        'Cannot process new post from channel; ignoring post...'
      )
      return
    }

    let res: Pulse | null = null
    try {
      res = await this.savePulse(processedMessage)
    } catch (e) {
      this.logger.error('Could not save to DB:' + (e as Error).message)
    }

    this.logger.debug(
      `Saved pulse to DB (id: ${res?.id}, tgId: ${res?.telegramId})`
    )

    await this.cacheManager.reset()

    await this.prismaService.scraper.update({
      where: { name: BotService.SCRAPER_NAME },
      data: {
        maxProcessedTelegramId: res?.telegramId,
      },
    })
  }
}
