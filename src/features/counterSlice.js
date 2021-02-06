import { createSlice } from "@reduxjs/toolkit";



//counter store
export const counterSlice = createSlice({
  name: "count",
  initialState: {
    count: null,
  },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload.count;
    },
  },
});

export const { setCount } = counterSlice.actions;
export const selectCount = (state) => state.counter.count;

export default counterSlice.reducer;
