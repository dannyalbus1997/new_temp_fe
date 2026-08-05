import webStorage from "redux-persist/lib/storage"
import type { Storage as PersistStorage } from "redux-persist"

/**
 * No-op storage engine used during SSR (Next.js renders `providers.tsx` on
 * the server too, before hydration). `window.localStorage` doesn't exist
 * there, so we swap in a storage stub that resolves to nothing rather than
 * throwing. On the client, redux-persist gets the real `localStorage`.
 */
function createNoopStorage(): PersistStorage {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem() {
      return Promise.resolve()
    },
    removeItem() {
      return Promise.resolve()
    },
  }
}

export const persistStorage: PersistStorage =
  typeof window !== "undefined" ? webStorage : createNoopStorage()
