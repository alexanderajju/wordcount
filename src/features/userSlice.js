import { createSlice } from "@reduxjs/toolkit";

//user store

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action);
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
