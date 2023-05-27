import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userauth",
  initialState: {
    isLoggedIns: false,
    membertoken: null,
    userInfo: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIns = true;
      state.membertoken = action.payload.membertoken;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.isLoggedIns = false;
      state.membertoken = null;
      state.userInfo = {};
    },
  },
});

export const { login, logout } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
