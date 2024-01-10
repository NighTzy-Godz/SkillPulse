import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/User";
import { apiCallBegan } from "../actions/apiActions";

interface UserState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;

  userData: null | IUser;
}

const initialState: UserState = {
  loading: false,
  statusCode: null,
  error: null,

  userData: null,
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

    userGetDataSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.userData = action.payload.data;
    },
  },
});

const { userRequested, userRequestFailed, userGetDataSuccess } = slice.actions;

export const getUserData = (userId: string) =>
  apiCallBegan({
    url: `/user/getUserData/${userId}`,
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userGetDataSuccess.type,
  });

export default slice.reducer;
