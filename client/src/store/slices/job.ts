import { createSlice } from "@reduxjs/toolkit";
import { CreateJobData } from "../../interfaces/Job";
import { apiCallBegan } from "../actions/apiActions";

interface JobState {
  error: null | string;
  loading: boolean;
  statusCode: null | number;
}

const initialState: JobState = {
  error: null,
  loading: false,
  statusCode: null,
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    jobRequested: (job, action) => {
      job.loading = true;
    },

    jobRequestFailed: (job, action) => {
      job.loading = false;
      job.error = action.payload;
    },

    jobCreateSuccess: (job, action) => {
      job.loading = false;
      job.error = null;
      job.statusCode = action.payload.status;
    },

    setJobStatusCode: (job, action) => {
      job.statusCode = action.payload;
    },
  },
});

const { jobCreateSuccess, jobRequested, jobRequestFailed } = slice.actions;
export const { setJobStatusCode } = slice.actions;

export const createJob = (data: CreateJobData, companyId: string) =>
  apiCallBegan({
    url: `/job/${companyId}/createJob`,
    data,
    method: "POST",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobCreateSuccess.type,
    successMsg: "Successfully Create a Job Post",
  });

export default slice.reducer;
