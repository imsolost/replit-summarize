import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// use import.meta.env instead of process.env
const rapidApiKey = import.meta.env['VITE_RAPID_API_ARTICLE_KEY']

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey)
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')

      return headers
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    })
  })
})
// lazy to get summary on demand instead of page load
export const { useLazyGetSummaryQuery } = articleApi