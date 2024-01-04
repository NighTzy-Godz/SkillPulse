import { createSlice } from "@reduxjs/toolkit";
import { CompanyRegisterData } from "../../interfaces/Company";
import { apiCallBegan } from "../actions/apiActions";

interface CompanyState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;
}

const initialState: CompanyState = {
  loading: false,
  statusCode: null,
  error: null,
};

const slice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyRequested: (company, action) => {
      company.loading;
    },

    companyRequestFailed: (company, action) => {
      company.loading = false;
      company.error = action.payload;
    },

    companyRegisteredSuccess: (company, action) => {
      company.loading = false;
      company.error = null;
      company.statusCode = action.payload.status;
    },

    setStatusCode: (company, action) => {
      company.statusCode = action.payload;
    },
  },
});

export const { setStatusCode } = slice.actions;

const { companyRequested, companyRequestFailed, companyRegisteredSuccess } =
  slice.actions;

export const registerCompany = (data: CompanyRegisterData) =>
  apiCallBegan({
    url: "/company/registerCompany",
    data,
    method: "POST",
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyRegisteredSuccess.type,
    successMsg: "Successfully Registered the Company!",
  });

export default slice.reducer;
