import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export default slice.reducer;
