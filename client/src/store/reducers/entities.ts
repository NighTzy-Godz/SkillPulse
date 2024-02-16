import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import companyReducer from "../slices/company";
import userReducer from "../slices/user";
import jobReducer from "../slices/job";
import uiReducer from "../slices/ui";

export default combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
  job: jobReducer,
  ui: uiReducer,
});
