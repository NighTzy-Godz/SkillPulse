import { createSlice } from "@reduxjs/toolkit";
import {
  IUser,
  UserAboutEditData,
  UserAddExpData,
  UserApplyJobData,
  UserIntroEditData,
} from "../../interfaces/User";
import { apiCallBegan } from "../actions/apiActions";
import { ICompany, CompanyRegisterData } from "../../interfaces/Company";
import { IJob } from "../../interfaces/Job";

interface UserState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;

  registeredCompany: null | ICompany;
  userData: null | IUser;
}

const initialState: UserState = {
  loading: false,
  statusCode: null,
  error: null,

  registeredCompany: null,
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

    userRegisterCompanySuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.statusCode = action.payload.status;
      user.registeredCompany = action.payload.data;
    },

    userApplyJobSuccess: (user, action) => {
      (user.loading = false),
        (user.error = null),
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
  userRegisterCompanySuccess,
  userApplyJobSuccess,
} = slice.actions;

export const userApplyJob = (data: UserApplyJobData, jobId: string) =>
  apiCallBegan({
    url: `/user/applyJob/${jobId}`,
    data,
    method: "POST",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userApplyJobSuccess.type,
    successMsg: "Successfully applied to the job post!",
  });

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

export const userRegisterCompany = (data: CompanyRegisterData) =>
  apiCallBegan({
    url: "/company/registerCompany",
    data,
    method: "POST",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userRegisterCompanySuccess.type,
    successMsg: "Successfully Registered the Company!",
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
