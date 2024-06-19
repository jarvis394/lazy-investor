import { Injectable, Logger } from '@nestjs/common'
import { Update as TelegrafUpdate } from '@telegraf/types'
import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf'
import { Context as TelegrafContext } from 'telegraf'

@Update()
@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name)

  @On('channel_post')
  async onChannelPost(
    @Ctx() ctx: TelegrafContext<TelegrafUpdate.ChannelPostUpdate>
  ) {
    console.log(ctx.update.channel_post)
    this.logger.debug('Sent post')
    // ctx.getChat
    // ctx.sendMessage('Share:', {
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         {
    //           text: 'Share with your friends',
    //           url: 'https://vk.com',
    //         },
    //       ],
    //     ],
    //   },
    // })
  }
}
