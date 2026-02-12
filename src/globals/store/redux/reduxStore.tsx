import { configureStore } from '@reduxjs/toolkit'
import { sampleSlice } from 'src/features/sample/sampleReducer'

const reducers = {
    sampleReducer: sampleSlice.reducer,
}

const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store
