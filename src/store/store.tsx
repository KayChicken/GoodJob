import { configureStore } from '@reduxjs/toolkit'
import postSlice from '../slices/postSlice'
import inputSlice from '../slices/inputSlice'
export const store = configureStore({
    reducer: {
        posts: postSlice,
        input: inputSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch