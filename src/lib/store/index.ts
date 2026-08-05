import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist"

import { baseApi } from "@/lib/api/base-api"
import { rootReducer } from "@/lib/store/root-reducer"
import { persistStorage } from "@/lib/store/storage"

const persistConfig = {
  key: "root",
  storage: persistStorage,
  version: 1,
  // Only persist small client/UI slices. The RTK Query cache (`api`) is
  // intentionally excluded — server data should always be refetched, not
  // rehydrated from disk.
  whitelist: ["ui"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable actions during
        // rehydration; these action types are safe to ignore.
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(baseApi.middleware),
})

export const persistor = persistStore(store)

// Enables refetchOnFocus / refetchOnReconnect RTK Query behaviors.
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
