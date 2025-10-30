import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include',
  }),
  tagTypes: ['product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/api/admin/v1/get/all/product',
        method: 'GET',
      }),
      providesTags: ['product'],
    }),

    getAllUsers: builder.query({
      query: () => '/api/admin/v1/get/all/user',
      providesTags: ['product'],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/api/admin/v1/add/product',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['product'],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/api/admin/v1/update/product/${productId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['product'],
    }),

    deleteProduct: builder.mutation({
      query: ({ categoryId, productId }) => ({
        url: `/api/admin/v1/delete/product/${categoryId}/${productId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['product'],
    }),

    handleAvailability: builder.mutation({
      query: ({ body, productId }) => ({
        url: `/api/admin/v1/update/avalibilty/product/${productId}`,
        method: 'PUT',
        credentials: 'include',
        body,
      }),
       invalidatesTags: ['product'],
    }),

    getCategories: builder.query({
      query: () => ({
        url: '/api/admin/v1/get/category/all',
        method: 'GET',
      }),
      providesTags: ['product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllUsersQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useHandleAvailabilityMutation,
  useGetCategoriesQuery
} = productsApi;
