import { createSlice } from "@reduxjs/toolkit";
import {
  IUser,
  UserAboutEditData,
  UserAddExpData,
  UserIntroEditData,
} from "../../interfaces/User";
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

    userUpdateIntroSuccess: (user, action) => {
      (user.loading = false),
        (user.error = null),
        (user.userData = action.payload.data);

      user.statusCode = action.payload.status;
    },

    userAddExpSuccess: (user, action) => {
      (user.loading = false), (user.error = null);
      if (user.userData) {
        user.userData.experience = action.payload.data.experience;
      }
      user.statusCode = action.payload.status;
    },

    userUpdateAboutSuccess: (user, action) => {
      if (user.userData) {
        user.userData.about = action.payload.data.about;
      }
      (user.error = null),
        (user.loading = false),
        (user.statusCode = action.payload.status);
    },

    setUserStatusCode: (user, action) => {
      user.statusCode = action.payload;
    },
  },
});

export const { setUserStatusCode } = slice.actions;

const {
  userRequested,
  userRequestFailed,
  userGetDataSuccess,
  userUpdateIntroSuccess,
  userUpdateAboutSuccess,
  userAddExpSuccess,
} = slice.actions;

export const getUserData = (userId: string) =>
  apiCallBegan({
    url: `/user/getUserData/${userId}`,
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userGetDataSuccess.type,
  });

export const updateUserIntro = (data: UserIntroEditData) =>
  apiCallBegan({
    url: "/user/updateUserIntro",
    data,
    method: "PUT",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userUpdateIntroSuccess.type,
    successMsg: "Successfully Updated Your Intro!",
  });

export const addUserExp = (data: UserAddExpData) =>
  apiCallBegan({
    url: "/user/addUserExp",
    data,
    method: "POST",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userAddExpSuccess.type,
    successMsg: "Successfully Added Your Experience!",
  });

export const updateUserAbout = (data: UserAboutEditData) =>
  apiCallBegan({
    url: "/user/updateUserAbout",
    data,
    method: "PUT",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userUpdateAboutSuccess.type,
    successMsg: "Successfully Updated Your About!",
  });

export default slice.reducer;
