import { createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../../interfaces/Company";
import { apiCallBegan } from "../actions/apiActions";
import { ChangePhotoData } from "../../interfaces/User";

interface CompanyState {
  loading: boolean;
  statusCode: null | number;
  error: null | string;

  companySearchResult: null | ICompany[];
  currCompany: null | ICompany;
}

const initialState: CompanyState = {
  loading: false,
  statusCode: null,
  error: null,

  companySearchResult: null,
  currCompany: null,
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

    companyGetDataSuccess: (company, action) => {
      company.loading = false;
      company.error = null;
      company.currCompany = action.payload.data;
    },

    companyUpdatedPhotoSuccess: (company, action) => {
      company.loading = false;
      company.error = null;
      company.currCompany = action.payload.data;
      company.statusCode = action.payload.status;
    },

    setStatusCode: (company, action) => {
      company.statusCode = action.payload;
    },
  },
});

export const { setStatusCode } = slice.actions;

const {
  companyRequested,
  companyUpdatedPhotoSuccess,
  companyRequestFailed,
  companyGetDataSuccess,
} = slice.actions;

export const updateCompanyLogo = (data: ChangePhotoData) =>
  apiCallBegan({
    url: "/company/updateCompanyLogo",
    data,
    method: "PUT",
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyUpdatedPhotoSuccess.type,
    successMsg: "Successfully updated the company logo!",
  });

export const updateCompanyCoverPhoto = (data: ChangePhotoData) =>
  apiCallBegan({
    url: "/company/updateCompanyCoverPhoto",
    data,
    method: "PUT",
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyUpdatedPhotoSuccess.type,
    successMsg: "Successfully updated the company cover photo!",
  });

export const getCompanyData = (companyId: string) =>
  apiCallBegan({
    url: `/company/getCompanyData/${companyId}`,
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyGetDataSuccess.type,
  });

export default slice.reducer;
