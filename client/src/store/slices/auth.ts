import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;
}

const initialState: AuthState = {
  loading: false,
  statusCode: null,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequested: (auth, action) => {
      auth.loading = true;
    },

    authRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
    },
  },
});

export default slice.reducer;
