import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../components/Main'
import axios from 'axios'
import { randomInteger } from '../utils/randomInteger'

export interface InputState {
    search: string
}




const initialState: InputState = {
    search: ''
}


export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
    },

})


export const { setSearchValue } = inputSlice.actions

export default inputSlice.reducer