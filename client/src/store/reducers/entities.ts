import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import companyReducer from "../slices/company";
import userReducer from "../slices/user";

export default combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
});
