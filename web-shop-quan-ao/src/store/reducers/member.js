import { createSlice } from "@reduxjs/toolkit";
import { clear } from "@testing-library/user-event/dist/clear";

export const userSlice = createSlice({
  name: "userauth",
  initialState: {
    isLoggedIns: false,
    token: null,
    userInfo: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIns = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    profile: (state, action) => {
      state.isLoggedIns = true;
      state.headers.Authorization = `Bearer ${state.userauth.token}`;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.isLoggedIns = "";
      state.token = null;
      state.userInfo = {};
    },
  },
});

export const { login, logout, profile } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
