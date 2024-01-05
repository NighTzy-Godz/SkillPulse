import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;
}

const initialState: UserState = {
  loading: false,
  statusCode: null,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },

    userRequestFailed: (user, action) => {
      user.loading = false;
      user.error = action.payload;
    },
  },
});

export default slice.reducer;
