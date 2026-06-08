import { configureStore } from '@reduxjs/toolkit'
import { sampleSlice } from 'src/features/sample/sampleReducer'

const reducers = {
    sampleReducer: sampleSlice.reducer,
}

const store = configureStore({
    reducer: reducers,
    devTools: import.meta.env.DEV,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store
