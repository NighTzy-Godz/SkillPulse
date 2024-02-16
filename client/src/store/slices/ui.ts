import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showPfp: boolean;
}

const initialState: UIState = {
  showPfp: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowPfp: (ui, action) => {
      ui.showPfp = action.payload;
    },
  },
});

export const { setShowPfp } = slice.actions;

export default slice.reducer;
