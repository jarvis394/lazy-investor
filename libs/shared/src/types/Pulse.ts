import { Pulse } from '@prisma/client'

export type PulseGetPageReq = { page: number; filter?: string }
export type PulseGetPageRes = {
  pulses: Pulse[]
  count: number
  pages: number
  /** Share tag filter */
  filter?: string
}
