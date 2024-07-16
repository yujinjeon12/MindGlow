import { configureStore } from '@reduxjs/toolkit';
import CanvasReducer from './features/canvas/CanvasSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      CanvasReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']