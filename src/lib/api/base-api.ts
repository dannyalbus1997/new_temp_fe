import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/**
 * Single RTK Query base API instance for the whole app.
 *
 * Feature modules should NOT create their own `createApi` instance — instead
 * they call `baseApi.injectEndpoints({...})` from their own `api.ts` file.
 * This keeps one shared cache, one middleware, and one reducer path while
 * still letting each feature own its endpoints (see `src/features/*`).
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "/api",
    prepareHeaders: (headers) => {
      // Attach auth headers here once auth is wired up, e.g.:
      // const token = getTokenFromSomewhere()
      // if (token) headers.set("authorization", `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
})
