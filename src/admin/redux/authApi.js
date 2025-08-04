
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (email) => ({
        url: '/api/admin/v1/login',
        method: 'POST',
        body: { email },
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/api/admin/v1/login/verify',
        method: 'POST',
        body: { email, otp },
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyOtpMutation } = authApi;
