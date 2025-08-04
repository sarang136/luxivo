import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("authDetails")),
  },
  reducers: {
    logoutReporter: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload}) => {
        console.log("verifyOtp payload received:", payload);
        state.user = payload; 
        localStorage.setItem("shopDetails",JSON.stringify(payload))
      }
    );
  }
});

export const { logoutReporter } = authSlice.actions;
export default authSlice.reducer;
