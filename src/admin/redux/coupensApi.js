import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coupensApi = createApi({
  reducerPath: 'coupensApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllCoupens: builder.query({
      query: () => '/api/coupens',
    }),
    addCoupen: builder.mutation({
      query: (newData) => ({
        url: '/api/coupens',
        method: 'POST',
        body: newData,
      }),
    }),
    editCoupen: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/coupens/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteCoupen: builder.mutation({
      query: (id) => ({
        url: `/api/coupens/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllCoupensQuery,
  useAddCoupenMutation,
  useEditCoupenMutation,
  useDeleteCoupenMutation,
} = coupensApi;
