import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";

// redux store
export default configureStore({
  reducer: {
    // Slice handling
    counter: counterReducer,
    user: userReducer,
  },
});
