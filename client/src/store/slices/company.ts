import { createSlice } from "@reduxjs/toolkit";
import {
  CompanyUpdateIntroData,
  CompanyUpdateOverviewData,
  ICompany,
} from "../../interfaces/Company";
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

    companyIntroUpdateSuccess: (company, action) => {
      company.loading = false;
      company.error = null;
      company.statusCode = action.payload.status;
      company.currCompany = action.payload.data;
    },

    companyOverviewUpdateSuccess: (company, action) => {
      company.loading = false;
      company.error = null;
      company.statusCode = action.payload.status;
      company.currCompany = action.payload.data;
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
  companyIntroUpdateSuccess,
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

export const updateCompanyIntro = (data: CompanyUpdateIntroData) =>
  apiCallBegan({
    url: "/company/updateCompanyIntro",
    method: "PUT",
    data,
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyIntroUpdateSuccess.type,
    successMsg: "Successfully Updated the company intro",
  });

export const updateCompanyOverview = (data: CompanyUpdateOverviewData) =>
  apiCallBegan({
    url: "/company/updateCompanyOverview",
    method: "PUT",
    data,
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyIntroUpdateSuccess.type,
    successMsg: "Successfully Updated the company overview!",
  });

export const getCompanyData = (companyId: string) =>
  apiCallBegan({
    url: `/company/getCompanyData/${companyId}`,
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyGetDataSuccess.type,
  });

export default slice.reducer;
