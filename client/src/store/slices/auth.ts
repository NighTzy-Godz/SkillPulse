import { createSlice } from "@reduxjs/toolkit";
import { LoginUserData } from "../../interfaces/User";
import { apiCallBegan } from "../actions/apiActions";

interface AuthState {
  loading: boolean;
  statusCode: null | number;
  token: null | string;
  error: null | string;
}

const initialState: AuthState = {
  loading: false,
  statusCode: null,
  error: null,
  token: null,
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

    authLoginSuccess: (auth, action) => {
      (auth.loading = false),
        (auth.statusCode = action.payload.status),
        (auth.token = action.payload.data);
    },

    setStatusCode: (auth, action) => {
      auth.statusCode = action.payload;
    },
  },
});

export default slice.reducer;
export const { setStatusCode } = slice.actions;

const { authLoginSuccess, authRequestFailed, authRequested } = slice.actions;

export const userLogin = (data: LoginUserData) =>
  apiCallBegan({
    url: "/user/loginUser",
    data,
    method: "POST",
    onStart: authRequested.type,
    onError: authRequestFailed.type,
    onSuccess: authLoginSuccess.type,
    successMsg: "Successfully Logged In",
  });