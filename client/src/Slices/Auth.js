import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Details: localStorage.getItem("Details")
    ? JSON.parse(localStorage.getItem("Details"))
    : null,
  Token: localStorage.getItem("Token")
    ? JSON.parse(localStorage.getItem("Token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.Details = action.payload.Details;
      localStorage.setItem("Details", JSON.stringify(action.payload.Details));
      state.Token = action.payload.Token;
      localStorage.setItem("Token", JSON.stringify(action.payload.Token));
    },
    logout: (state, action) => {
      state.Details = null;
      state.Token = null;
      localStorage.removeItem("Details");
      localStorage.removeItem("Token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
