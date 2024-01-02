import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;

export type State = ReturnType<typeof reducer>;
