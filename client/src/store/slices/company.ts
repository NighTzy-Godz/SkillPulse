import { createSlice } from "@reduxjs/toolkit";
import { CompanyRegisterData, ICompany } from "../../interfaces/Company";
import { apiCallBegan } from "../actions/apiActions";

interface CompanyState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;

  companySearchResult: null | ICompany[];
}

const initialState: CompanyState = {
  loading: false,
  statusCode: null,
  error: null,

  companySearchResult: null,
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

    companySearchSuccess: (company, action) => {
      (company.loading = false),
        (company.error = null),
        (company.companySearchResult = action.payload.data);
    },

    setStatusCode: (company, action) => {
      company.statusCode = action.payload;
    },
  },
});

export const { setStatusCode } = slice.actions;

const {
  companyRequested,
  companyRequestFailed,
  companyRegisteredSuccess,
  companySearchSuccess,
} = slice.actions;

// export const searchCompany = (searchTerm: string) => {
//   console.log(searchTerm);
//   return apiCallBegan({
//     url: `/company/search/${searchTerm}`,
//     onStart: companyRequested.type,
//     onError: companyRequestFailed.type,
//     onSuccess: companySearchSuccess.type,
//   });
// };

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
