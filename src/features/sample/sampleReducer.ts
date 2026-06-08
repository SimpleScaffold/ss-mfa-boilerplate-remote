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
        multiply: (state) => {
            state.value *= 2
        },
        divide: (state) => {
            state.value = Math.floor(state.value / 2)
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    },
})

export const sampleSlice = sampleModule
export const sampleAction = sampleModule.actions
