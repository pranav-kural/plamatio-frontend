import {configureStore} from '@reduxjs/toolkit/react';
import {setupListeners} from '@reduxjs/toolkit/query';
import {apiSlice} from './api/api-slice';
import cartSliceReducer from './store/reducers/cart/cartReducer';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    cart: cartSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']