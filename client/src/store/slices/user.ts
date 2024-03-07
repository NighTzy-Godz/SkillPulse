import { createSlice } from "@reduxjs/toolkit";
import {
  ChangePhotoData,
  IUser,
  UserAboutEditData,
  UserAddEducationData,
  UserAddExpData,
  UserApplyJobData,
  UserIntroEditData,
  UserUpdateEducationData,
} from "../../interfaces/User";
import { apiCallBegan } from "../actions/apiActions";
import { ICompany, CompanyRegisterData } from "../../interfaces/Company";
import { IJob, SaveUnsaveJobData } from "../../interfaces/Job";

interface UserState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;

  authUser: null | IUser;

  searchedUsers: IUser[];

  registeredCompany: null | ICompany;
  userData: null | IUser;
  userJobs: null | IJob[];
  userSelectedJob: null | IJob;
}

const initialState: UserState = {
  loading: false,
  statusCode: null,
  error: null,

  authUser: null,
  registeredCompany: null,
  userData: null,
  userJobs: null,
  userSelectedJob: null,
  searchedUsers: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },

    userRequestFailed: (user, action) => {
      console.log(action.payload);
      user.loading = false;
      user.error = action.payload;
    },

    userGetDataSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.userData = action.payload.data;
    },

    userUpdateIntroSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.userData = action.payload.data;

      user.statusCode = action.payload.status;
    },

    userAddExpSuccess: (user, action) => {
      user.loading = false;
      user.error = null;

      if (user.userData) {
        user.userData.experience = action.payload.data.experience;
      }
      user.statusCode = action.payload.status;
    },

    userUpdateAboutSuccess: (user, action) => {
      if (user.userData) {
        user.userData.about = action.payload.data.about;
      }
      user.error = null;
      user.loading = false;
      user.statusCode = action.payload.status;
    },

    userRegisterCompanySuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.statusCode = action.payload.status;
      user.registeredCompany = action.payload.data;
    },

    userApplyJobSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.statusCode = action.payload.status;
    },

    userJobsSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.userJobs = action.payload.data;
    },

    userAuthSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.authUser = action.payload.data;
    },

    userSelectedJobSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.userSelectedJob = action.payload.data;
    },

    userUpdatedPhotoSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.statusCode = action.payload.status;
      user.authUser = action.payload.data;
      user.userData = action.payload.data;
    },

    userAddEducationSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.statusCode = action.payload.status;
      if (user.userData)
        user.userData.education = action.payload.data.education;
    },

    userDeleteEducation: (user, action) => {
      user.loading = false;
      user.error = null;
      user.statusCode = action.payload.status;
      if (user.userData)
        user.userData.education = action.payload.data.education;
    },

    searchedUserSuccess: (user, action) => {
      user.loading = false;
      user.error = null;
      user.searchedUsers = action.payload.data;
    },
    setUserStatusCode: (user, action) => {
      user.statusCode = action.payload;
    },
  },
});

export const { setUserStatusCode } = slice.actions;

const {
  searchedUserSuccess,
  userUpdatedPhotoSuccess,
  userRequested,

  userRequestFailed,
  userGetDataSuccess,
  userUpdateIntroSuccess,
  userUpdateAboutSuccess,
  userAddExpSuccess,
  userRegisterCompanySuccess,
  userApplyJobSuccess,
  userSelectedJobSuccess,
  userAddEducationSuccess,
  userDeleteEducation,
  userAuthSuccess,
} = slice.actions;

export const getUserData = (userId: string) => {
  return apiCallBegan({
    url: `/user/getUserData/${userId}`,
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userGetDataSuccess.type,
  });
};

export const getSearchedUsers = (searchTerm: string) =>
  apiCallBegan({
    url: `/user/searchUser/${searchTerm}`,
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: searchedUserSuccess.type,
  });

export const userGetSelectedJob = (jobId: string) =>
  apiCallBegan({
    url: `/job/getJobDescription/${jobId}`,
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userSelectedJobSuccess.type,
  });

export const getAuthUserData = (userId: string) =>
  apiCallBegan({
    url: `/user/getUserData/${userId}`,
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userAuthSuccess.type,
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

export const userRegisterCompany = (data: CompanyRegisterData) =>
  apiCallBegan({
    url: "/company/registerCompany",
    data,
    method: "POST",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userRegisterCompanySuccess.type,
    successMsg:
      "Successfully Registered the Company!. Please re-login to take effect.",
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

export const updateUserPfp = (data: ChangePhotoData) =>
  apiCallBegan({
    url: "/user/updateUserPfp",
    data,
    method: "PUT",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userUpdatedPhotoSuccess.type,
    successMsg: "Successfully updated your profile picture!",
  });

export const updateUserCoverPhoto = (data: ChangePhotoData) =>
  apiCallBegan({
    url: "/user/updateUserCoverPhoto",
    data,
    method: "PUT",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userUpdatedPhotoSuccess.type,
    successMsg: "Successfully updated your cover photo!",
  });

export const updateUserEducation = (data: UserUpdateEducationData) =>
  apiCallBegan({
    url: "/user/updateUserEducation",
    data,
    method: "PUT",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userAddEducationSuccess.type,
    successMsg: "Successfully updated your education!",
  });

export const addUserEducation = (data: UserAddEducationData) =>
  apiCallBegan({
    url: "/user/addUserEducation",
    data,
    method: "POST",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userAddEducationSuccess.type,
    successMsg: "Successfully added your education",
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

export const updateUserExp = (data: UserAddExpData) =>
  apiCallBegan({
    url: "/user/updateUserExp",
    data,
    method: "PUT",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userAddExpSuccess.type,
    successMsg: "Successfully Updated Your Experience!",
  });

export const deleteUserEducation = (itemId: string) =>
  apiCallBegan({
    url: `/user/deleteEducation/${itemId}`,
    method: "DELETE",
    onStart: userRequested.type,
    onError: userRequestFailed.type,
    onSuccess: userDeleteEducation.type,
    successMsg: "Successfully Deleted the Education Item!",
  });

export default slice.reducer;
