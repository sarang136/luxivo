import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include", // send cookies like User_token & admin_auth
  }),
  endpoints: (builder) => ({
    // 🔹 Admin Login
    login: builder.mutation({
      query: (email) => ({
        url: "/api/admin/v1/login",
        method: "POST",
        body: { email },
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/api/admin/v1/login/verify",
        method: "POST",
        body: { email, otp },
      }),
    }),

    addShirtBanner: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("fileUrl", file));

        return {
          url: "/api/shirtBanner/addBanner",
          method: "POST",
          body: formData,
        };
      },
    }),

    addSale: builder.mutation({
      query: (formData) => ({
        url: "/api/sale/addSale",
        method: "POST",
        body: formData,
      }),
    }),

    getAllSales: builder.query({
      query: () => ({
        url: "/api/sale/getAllSales",
        method: "GET",
      }),
    }),

 
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/api/sale/deleteSale/${id}`,
        method: "DELETE",
      }),
    }),
    
    getShirtBanner: builder.query({
      query: () => '/api/shirtBanner',
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/shirtBanner/delete/banner/${id}`,
        method: "DELETE",
      }),
    }),


  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useAddShirtBannerMutation,
  useAddSaleMutation,
  useGetAllSalesQuery,
  useDeleteSaleMutation,
  useDeleteBannerMutation,
  useGetShirtBannerQuery,

} = authApi;
