import { createSlice } from "@reduxjs/toolkit";
export enum UserType {
  USER = "user",
  COMPANY = "company",
}
interface UIState {
  showPfp: boolean;
  showCoverPhoto: boolean;
  isProfileClicked: boolean;
  showResume: boolean;
  userType: null | UserType;
}

const initialState: UIState = {
  showPfp: false,
  showResume: false,
  showCoverPhoto: false,
  isProfileClicked: false,
  userType: null,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowPfp: (ui, action) => {
      ui.showPfp = action.payload;
    },

    setShowResume: (ui, action) => {
      ui.showResume = action.payload;
    },

    setShowCoverPhoto: (ui, action) => {
      ui.showCoverPhoto = action.payload;
    },

    setIsProfileClicked: (ui, action) => {
      ui.isProfileClicked = action.payload;
    },

    setUserType: (ui, action) => {
      ui.userType = action.payload;
    },
  },
});

export const {
  setUserType,
  setShowPfp,
  setIsProfileClicked,
  setShowCoverPhoto,
  setShowResume,
} = slice.actions;

export default slice.reducer;
