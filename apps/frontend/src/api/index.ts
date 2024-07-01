import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config/constants'
import {
  PulseGetPageReq,
  PulseGetPageRes,
  ShareGetListReq,
  ShareGetListRes,
} from '@app/shared'

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Pulse', 'PulsesPage', 'PulsesByTagPage', 'ShareTag'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    pulsesGetPage: builder.query<PulseGetPageRes, PulseGetPageReq>({
      query: ({ page, filter }) => ({
        url: `pulse/page/${page}`,
        method: 'POST',
        body: filter,
      }),
      providesTags: (
        result = { pulses: [], count: 0, pages: 0 },
        _err,
        arg
      ) => [
        {
          type: arg.filter ? 'PulsesByTagPage' : 'PulsesPage',
          id: arg.page,
        },
        ...result.pulses.map((device) => ({
          type: 'Pulse' as const,
          id: device.id,
        })),
      ],
    }),
    shareTagsGetList: builder.query<ShareGetListRes, ShareGetListReq>({
      query: () => 'share/list',
      providesTags: ['ShareTag'],
    }),
  }),
})

export const { usePulsesGetPageQuery, useShareTagsGetListQuery } = apiSlice
