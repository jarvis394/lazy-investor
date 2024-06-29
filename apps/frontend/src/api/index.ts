import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config/constants'
import { PulseGetPageReq, PulseGetPageRes } from '@app/shared'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    pulsesGetPage: builder.query<PulseGetPageRes, PulseGetPageReq>({
      query: (page) => `pulse/page/${page}`,
    }),
  }),
})

export const { usePulsesGetPageQuery } = apiSlice
