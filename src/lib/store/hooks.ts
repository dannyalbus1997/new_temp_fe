import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"

import type { AppDispatch, RootState } from "@/lib/store"

/**
 * Typed Redux hooks — use these instead of the plain `useDispatch` /
 * `useSelector` everywhere in the app so state and actions stay type-safe.
 */
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
