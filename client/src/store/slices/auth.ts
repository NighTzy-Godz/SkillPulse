import { createSlice } from "@reduxjs/toolkit";
import { LoginUserData, RegisterUserData } from "../../interfaces/User";
import { apiCallBegan } from "../actions/apiActions";

export interface DecodedModel {
  _id: string;
  role: string;
  company: string;
}

interface AuthState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;
  token: null | string;
  decodedModel: null | DecodedModel;
}

const initialState: AuthState = {
  loading: false,
  statusCode: null,
  error: null,
  token: null,
  decodedModel: null,
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

    authRegisterSuccess: (auth, action) => {
      (auth.loading = false), (auth.statusCode = action.payload.status);
    },

    setStatusCode: (auth, action) => {
      auth.statusCode = action.payload;
    },

    setDecodedModel: (auth, action) => {
      auth.decodedModel = action.payload;
    },
  },
});

export default slice.reducer;
export const { setStatusCode, setDecodedModel } = slice.actions;

const {
  authLoginSuccess,
  authRequestFailed,
  authRequested,
  authRegisterSuccess,
} = slice.actions;

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

export const userRegister = (data: RegisterUserData) =>
  apiCallBegan({
    url: "/user/registerUser",
    data,
    method: "POST",
    onStart: authRequested.type,
    onError: authRequestFailed.type,
    onSuccess: authRegisterSuccess.type,
    successMsg: `Successfully Created the Account for ${data.firstName} ${data.lastName}`,
  });
