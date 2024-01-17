import { createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../../interfaces/Company";
import { apiCallBegan } from "../actions/apiActions";

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

    setStatusCode: (company, action) => {
      company.statusCode = action.payload;
    },
  },
});

export const { setStatusCode } = slice.actions;

const { companyRequested, companyRequestFailed, companyGetDataSuccess } =
  slice.actions;

export const getCompanyData = (companyId: string) =>
  apiCallBegan({
    url: `/company/getCompanyData/${companyId}`,
    onStart: companyRequested.type,
    onError: companyRequestFailed.type,
    onSuccess: companyGetDataSuccess.type,
  });

export default slice.reducer;
