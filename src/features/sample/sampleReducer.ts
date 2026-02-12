import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const sampleModule = createSlice({
    name: 'sample',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    },
})

export const sampleSlice = sampleModule
export const sampleAction = sampleModule.actions
