import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { Api, TelegramClient } from 'telegram'
import { ConfigService } from '../config/config.service'
import { StringSession } from 'telegram/sessions'
import { PrismaService } from 'nestjs-prisma'
import { Pulse } from '@prisma/client'

type PulseWithoutId = Omit<Pulse, 'id'>

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name)
  static CHANNEL_URL = 'https://t.me/leniviy_investor'
  static SCRAPER_NAME = 'main'
  static FETCH_HISTORY_LIMIT = 100

  client: TelegramClient
  maxProcessedTelegramId = -1
  minProcessedTelegramId = -1
  messagesCount = -1

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {
    const sessionString = new StringSession(
      this.configService.TELEGRAM_SESSION_KEY
    )
    this.client = new TelegramClient(
      sessionString,
      this.configService.TELEGRAM_APP_ID,
      this.configService.TELEGRAM_APP_HASH,
      {
        connectionRetries: 5,
      }
    )
  }

  async onApplicationBootstrap() {
    await this.client.connect()
    await this.prismaService.$connect()
  }

  async onApplicationShutdown() {
    await this.prismaService.$disconnect()
  }

  async fetchChannelHistory(offset = 0): Promise<Api.messages.ChannelMessages> {
    const res = await this.client.invoke(
      new Api.messages.GetHistory({
        peer: AppService.CHANNEL_URL,
        addOffset: offset,
        limit: AppService.FETCH_HISTORY_LIMIT,
      })
    )

    if (res.className !== 'messages.ChannelMessages') {
      throw new Error('Did not find channel messages')
    }

    return res
  }

  async getButtonDataFromMessage(
    message: Api.Message
  ): Promise<false | { url: string; text: string }> {
    if (
      !message.replyMarkup ||
      message.replyMarkup.className !== 'ReplyInlineMarkup'
    ) {
      this.logger.warn(
        `Provided message does not have reply markup: ${message.id}, ${message.className}`
      )
      return false
    }

    const firstRow = message.replyMarkup.rows[0]
    if (!firstRow) {
      this.logger.warn(
        `Provided message reply markup does not have rows: ${message.id}, ${message.className}`
      )
      return false
    }

    const firstButton = firstRow.buttons[0]
    if (!firstButton) {
      this.logger.warn(
        `Provided message reply markup does not have buttons: ${message.id}, ${message.className}`
      )
      return false
    }

    if (firstButton.className !== 'KeyboardButtonUrl') {
      this.logger.warn(
        `Provided message reply markup is not valid: ${message.id}, ${firstButton.className}`
      )
      return false
    }

    return { url: firstButton.url, text: firstButton.text }
  }

  async processChannelMessage(
    message: Api.TypeMessage
  ): Promise<PulseWithoutId | false> {
    if (message.className !== 'Message') {
      this.logger.warn(
        `Provided message is not valid: ${message.id}, ${message.className}`
      )
      return false
    }

    const button = await this.getButtonDataFromMessage(message)

    if (!button) {
      this.logger.warn(
        `Provided message is not valid: ${message.id}, ${message.className}`
      )
      return false
    }

    const text = message.message

    // eslint-disable-next-line no-control-regex
    const shareTagRegExp = new RegExp('#(?<result>.*)\n', 'gm')
    const shareTag = shareTagRegExp.exec(text)?.groups?.result?.trim() || null
    // prettier-ignore
    // eslint-disable-next-line no-useless-escape
    const shareRegExp = new RegExp('Инвест-идея по акции[\s*]?(?<result>.*)[\s*]?#', 'gm')
    const share = shareRegExp.exec(text)?.groups?.result?.trim()
    // prettier-ignore
    // eslint-disable-next-line no-useless-escape, no-control-regex
    const shareWithoutTagRegExp = new RegExp('Инвест-идея по акции[\s*]?(?<result>.*)[.*]?\n', 'gm')
    const shareWithoutTag = shareWithoutTagRegExp
      .exec(text)
      ?.groups?.result?.trim()
    // prettier-ignore
    // eslint-disable-next-line no-useless-escape, no-control-regex
    const goalRegExp = new RegExp('Цель:[\s*]?(?<result>.*)[\s*]?\n', 'gm')
    const goal = goalRegExp.exec(text)?.groups?.result?.trim()
    // prettier-ignore
    // eslint-disable-next-line no-useless-escape, no-control-regex
    const potentialPercentageRegExp = new RegExp('Потенциал:[\s*]?(?<result>.*)[\s*]?\%', 'gm')
    const potentialPercentage = potentialPercentageRegExp
      .exec(text)
      ?.groups?.result?.trim()
      .replace(',', '.')
    const parsedPotentialPercentage = Number(potentialPercentage)

    // prettier-ignore
    // eslint-disable-next-line no-useless-escape, no-control-regex
    const investmentSuccessTimeRegExp = new RegExp('Срок реализации:[\s*]?(?<result>.*)[\s*]?', 'gm')
    const investmentSuccessTime =
      investmentSuccessTimeRegExp.exec(text)?.groups?.result?.trim() || null

    if ((!share && !shareWithoutTag) || !goal || !potentialPercentage) {
      this.logger.warn(
        `Provided message is missing components in text: ${message.id},\n${text}`
      )
      this.logger.warn(
        `Parsed values: share=${share}, shareWithoutTag=${shareWithoutTag}, ` +
          `shareTag=${shareTag}, goal=${goal}, potentialPercentage=${potentialPercentage}, ` +
          `investmentSuccessTime=${investmentSuccessTime}`
      )
      return false
    }

    return {
      share: share || shareWithoutTag || '',
      shareTag,
      goal,
      investmentSuccessTime,
      potentialPercentage,
      parsedPotentialPercentage: isNaN(parsedPotentialPercentage)
        ? null
        : parsedPotentialPercentage,
      telegramId: message.id,
      timestamp: new Date(message.date * 1000),
      buttonText: button.text,
      buttonUrl: button.url,
    }
  }

  async savePulses(pulses: PulseWithoutId[]) {
    const res = await this.prismaService.pulse.createMany({
      data: pulses,
    })

    return res
  }

  async startScraper() {
    if (!this.client.connected) {
      throw new Error('Telegram client is not connected')
    }

    const scraper = await this.prismaService.scraper.findFirst({
      where: { name: AppService.SCRAPER_NAME },
    })

    if (scraper) {
      this.maxProcessedTelegramId = scraper.maxProcessedTelegramId
      this.minProcessedTelegramId = scraper.minProcessedTelegramId
    } else {
      await this.prismaService.scraper.create({
        data: {
          maxProcessedTelegramId: this.maxProcessedTelegramId,
          minProcessedTelegramId: this.minProcessedTelegramId,
          name: AppService.SCRAPER_NAME,
        },
      })
    }

    const firstHistoryBatch = await this.fetchChannelHistory()
    const historyPromises: Array<Promise<Api.messages.ChannelMessages>> = []

    this.messagesCount = firstHistoryBatch.count
    this.logger.log(
      `Fetching ${this.messagesCount} posts from channel ${AppService.CHANNEL_URL}...`
    )

    for (
      let offset = AppService.FETCH_HISTORY_LIMIT;
      offset <= this.messagesCount;
      offset += AppService.FETCH_HISTORY_LIMIT
    ) {
      historyPromises.push(this.fetchChannelHistory(offset))
    }

    const responses = await Promise.all(historyPromises)
    let messages: Api.TypeMessage[] = firstHistoryBatch.messages
    responses.forEach((res) => {
      messages = messages.concat(res.messages)
    })

    const messagesPromises: Array<Promise<PulseWithoutId | false>> = []
    messages.forEach(async (message) => {
      messagesPromises.push(this.processChannelMessage(message))
    })

    let newMaxProcessedTelegramId = this.maxProcessedTelegramId
    let newMinProcessedTelegramId =
      this.minProcessedTelegramId > 0 ? this.minProcessedTelegramId : Infinity
    const allProcessedMessages = await Promise.all(messagesPromises)
    const processedMessages = allProcessedMessages.filter(
      (e): e is PulseWithoutId => {
        if (!e) return false
        if (
          e.telegramId >= this.minProcessedTelegramId &&
          e.telegramId <= this.maxProcessedTelegramId
        )
          return false

        newMaxProcessedTelegramId = Math.max(
          newMaxProcessedTelegramId,
          e.telegramId
        )
        newMinProcessedTelegramId = Math.min(
          newMinProcessedTelegramId,
          e.telegramId
        )
        return true
      }
    )

    const { count } = await this.savePulses(processedMessages)

    this.maxProcessedTelegramId = newMaxProcessedTelegramId
    this.minProcessedTelegramId = newMinProcessedTelegramId

    await this.prismaService.scraper.update({
      where: { name: AppService.SCRAPER_NAME },
      data: {
        maxProcessedTelegramId: this.maxProcessedTelegramId,
        minProcessedTelegramId: this.minProcessedTelegramId,
      },
    })

    this.logger.log(`Recorded ${count} pulses`)
  }
}
