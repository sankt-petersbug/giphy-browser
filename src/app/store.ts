import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/list/slice'

const store = configureStore({
  reducer: {
    list: listReducer,
  },
})

export type IRootState = ReturnType<typeof store.getState>

export default store