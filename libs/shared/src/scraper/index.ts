import { Pulse } from '@prisma/client'
import { Api } from 'telegram'
import * as tg from '@telegraf/types'

export type PulseWithoutId = Omit<Pulse, 'id'>

export const getButtonDataFromMessage = (
  message: Api.Message
): false | { url: string; text: string } => {
  if (
    !message.replyMarkup ||
    message.replyMarkup.className !== 'ReplyInlineMarkup'
  ) {
    console.warn(
      `Provided message does not have reply markup: ${message.id}, ${message.className}`
    )
    return false
  }

  const firstRow = message.replyMarkup.rows[0]
  if (!firstRow) {
    console.warn(
      `Provided message reply markup does not have rows: ${message.id}, ${message.className}`
    )
    return false
  }

  const firstButton = firstRow.buttons[0]
  if (!firstButton) {
    console.warn(
      `Provided message reply markup does not have buttons: ${message.id}, ${message.className}`
    )
    return false
  }

  if (firstButton.className !== 'KeyboardButtonUrl') {
    console.warn(
      `Provided message reply markup is not valid: ${message.id}, ${firstButton.className}`
    )
    return false
  }

  return { url: firstButton.url, text: firstButton.text }
}

export const getButtonDataFromTelegrafMessage = (
  message: tg.Message.TextMessage
): false | { url: string; text: string } => {
  if (!message.reply_markup) {
    console.warn(
      `Provided message does not have reply markup: ${message.message_id}`
    )
    return false
  }

  const firstRow = message.reply_markup.inline_keyboard[0]
  if (!firstRow) {
    console.warn(
      `Provided message reply markup does not have rows: ${message.message_id}`
    )
    return false
  }

  const firstButton = firstRow[0]
  if (!firstButton) {
    console.warn(
      `Provided message reply markup does not have buttons: ${message.message_id}`
    )
    return false
  }

  console.log(firstButton)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return { url: firstButton.url, text: firstButton.text }
}

export const processMessageText = (text: string) => {
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

  return {
    share: share || shareWithoutTag || '',
    shareTag,
    shareWithoutTag,
    goal,
    investmentSuccessTime,
    potentialPercentage,
    parsedPotentialPercentage: isNaN(parsedPotentialPercentage)
      ? null
      : parsedPotentialPercentage,
  }
}

export const processTelegrafChannelMessage = async (
  message: tg.Message.TextMessage
): Promise<PulseWithoutId | false> => {
  const text = message.text
  const button = getButtonDataFromTelegrafMessage(message)

  if (!button) {
    console.warn(`Provided message is not valid: ${message.message_id}`)
    return false
  }

  const {
    goal,
    investmentSuccessTime,
    parsedPotentialPercentage,
    shareWithoutTag,
    potentialPercentage,
    share,
    shareTag,
  } = processMessageText(text)

  if ((!share && !shareWithoutTag) || !goal || !potentialPercentage) {
    console.warn(`Provided message is missing components in text:\n${text}`)
    console.warn(
      `Parsed values: share=${share}, shareWithoutTag=${shareWithoutTag}, ` +
        `shareTag=${shareTag}, goal=${goal}, potentialPercentage=${potentialPercentage}, ` +
        `investmentSuccessTime=${investmentSuccessTime}`
    )
    return false
  }

  return {
    share,
    shareTag,
    goal,
    investmentSuccessTime,
    potentialPercentage,
    parsedPotentialPercentage,
    telegramId: message.message_id,
    timestamp: new Date(message.date * 1000),
    buttonText: button.text,
    buttonUrl: button.url,
  }
}

export const processChannelMessage = async (
  message: Api.TypeMessage
): Promise<PulseWithoutId | false> => {
  if (message.className !== 'Message') {
    console.warn(
      `Provided message is not valid: ${message.id}, ${message.className}`
    )
    return false
  }

  const button = getButtonDataFromMessage(message)

  if (!button) {
    console.warn(
      `Provided message is not valid: ${message.id}, ${message.className}`
    )
    return false
  }

  const text = message.message
  const {
    goal,
    investmentSuccessTime,
    parsedPotentialPercentage,
    shareWithoutTag,
    potentialPercentage,
    share,
    shareTag,
  } = processMessageText(text)

  if ((!share && !shareWithoutTag) || !goal || !potentialPercentage) {
    console.warn(`Provided message is missing components in text:\n${text}`)
    console.warn(
      `Parsed values: share=${share}, shareWithoutTag=${shareWithoutTag}, ` +
        `shareTag=${shareTag}, goal=${goal}, potentialPercentage=${potentialPercentage}, ` +
        `investmentSuccessTime=${investmentSuccessTime}`
    )
    return false
  }

  return {
    share,
    shareTag,
    goal,
    investmentSuccessTime,
    potentialPercentage,
    parsedPotentialPercentage,
    telegramId: message.id,
    timestamp: new Date(message.date * 1000),
    buttonText: button.text,
    buttonUrl: button.url,
  }
}
