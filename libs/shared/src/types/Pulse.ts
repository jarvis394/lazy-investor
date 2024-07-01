import { Pulse } from '@prisma/client'

export type PulseGetPageFilter = Partial<{
  search: string
  shareTag: string
}>

export type PulseGetPageReq = {
  page: number
  filter?: PulseGetPageFilter
}

export type PulseGetPageRes = {
  pulses: Pulse[]
  count: number
  pages: number
  /** Share tag filter */
  filter?: PulseGetPageFilter
}
