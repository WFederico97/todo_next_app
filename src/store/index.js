// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import todos from './todos'

export const store = configureStore({
  reducer: {
    todos
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
