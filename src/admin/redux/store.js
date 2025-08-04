// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi'; 
import authSlice from "../redux/slice";
import { productsApi } from './productsApi';
import { ordersApi } from './ordersApi';
import { coupensApi } from './coupensApi';
// import { ordersApi } from './ordersApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [coupensApi.reducerPath]: coupensApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, ordersApi.middleware, coupensApi.middleware), 
});
