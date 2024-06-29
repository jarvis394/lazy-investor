import { Pulse } from '@prisma/client'

export type PulseGetPageReq = number
export type PulseGetPageRes = {
  pulses: Pulse[]
  count: number
  pages: number
}
