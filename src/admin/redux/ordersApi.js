



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({

        getAllOrders: builder.query({
            query: () => '/api/admin/v1/get/all/order',
        }),
    }),
});

export const { useGetAllOrdersQuery } = ordersApi;
