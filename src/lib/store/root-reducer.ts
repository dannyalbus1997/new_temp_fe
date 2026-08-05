import { combineReducers } from "@reduxjs/toolkit"

import { baseApi } from "@/lib/api/base-api"
import uiReducer from "@/lib/store/ui-slice"

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  ui: uiReducer,
  // Register additional feature slices here, e.g.:
  // auth: authReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
