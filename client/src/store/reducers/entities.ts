import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import companyReducer from "../slices/company";

export default combineReducers({
  auth: authReducer,
  company: companyReducer,
});
