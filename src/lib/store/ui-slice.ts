import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

/**
 * Example client/UI-only slice. This is the kind of slice that SHOULD be
 * persisted (see `persistConfig.whitelist` in `index.ts`) — small bits of UI
 * preference/state, not server data (that belongs in RTK Query's cache,
 * which is never persisted).
 */
export interface UiState {
  sidebarOpen: boolean
}

const initialState: UiState = {
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { setSidebarOpen, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
