import { createSlice } from '@reduxjs/toolkit'
import { SEARCH_HISTORY_STORAGE_KEY } from '../config/constants'
import safeJSONParse from '../utils/safeJSONParse'

const SEARCH_HISTORY_MAX_ITEMS = 5
const localStorageSearchHistory = safeJSONParse<string[]>(
  localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY) || '',
  []
)

export interface AppState {
  searchHistory: string[]
}

export const initialState: AppState = {
  searchHistory: localStorageSearchHistory,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addSearchToHistory: (state, action: { payload: string }) => {
      // Do not add search to history if it is already present
      if (state.searchHistory.some((e) => e === action.payload)) {
        return
      }

      state.searchHistory.unshift(action.payload)

      if (state.searchHistory.length > SEARCH_HISTORY_MAX_ITEMS) {
        state.searchHistory.pop()
      }

      localStorage.setItem(
        SEARCH_HISTORY_STORAGE_KEY,
        JSON.stringify(state.searchHistory)
      )
    },
  },
})

export const { addSearchToHistory } = appSlice.actions

export default appSlice.reducer
