import { processTelegrafChannelMessage } from '@app/shared'
import { Injectable, Logger } from '@nestjs/common'
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

  constructor(private readonly prismaService: PrismaService) {}

  async savePulse(pulse: PulseWithoutId) {
    const res = await this.prismaService.pulse.create({
      data: pulse,
    })

    return res
  }

  @On('channel_post')
  async onChannelPost(
    @Ctx()
    ctx: TelegrafContext<TelegrafUpdate.ChannelPostUpdate<Message.TextMessage>>
  ) {
    const message = ctx.channelPost
    this.logger.debug(`Got new post from channel (id: ${message.message_id})`)

    const processedMessage = await processTelegrafChannelMessage(message)

    if (!processedMessage) {
      this.logger.error(
        'Cannot process new post from channel; ignoring post...'
      )
      return
    }

    const res = await this.savePulse(processedMessage)
    this.logger.debug(
      `Saved pulse to DB (id: ${res.id}, tgId: ${res.telegramId})`
    )

    await this.prismaService.scraper.update({
      where: { name: BotService.SCRAPER_NAME },
      data: {
        maxProcessedTelegramId: message.message_id,
      },
    })
  }
}
