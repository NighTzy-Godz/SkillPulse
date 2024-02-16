import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showPfp: boolean;
  showCoverPhoto: boolean;
  isProfileClicked: boolean;
}

const initialState: UIState = {
  showPfp: false,
  showCoverPhoto: false,
  isProfileClicked: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowPfp: (ui, action) => {
      ui.showPfp = action.payload;
    },

    setShowCoverPhoto: (ui, action) => {
      ui.showCoverPhoto = action.payload;
    },

    setIsProfileClicked: (ui, action) => {
      ui.isProfileClicked = action.payload;
    },
  },
});

export const { setShowPfp, setIsProfileClicked, setShowCoverPhoto } =
  slice.actions;

export default slice.reducer;
