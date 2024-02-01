import { createSlice } from "@reduxjs/toolkit";
import {
  CreateJobData,
  IJob,
  SearchJobQuery,
  SearchJobResponse,
} from "../../interfaces/Job";
import { apiCallBegan } from "../actions/apiActions";

interface JobState {
  error: null | string;
  loading: boolean;
  statusCode: null | number;

  jobResults: SearchJobResponse;
}

const initialState: JobState = {
  error: null,
  loading: false,
  statusCode: null,

  jobResults: {
    jobs: [],
    totalCount: 0,
    currPage: 1,
  },
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

    jobSearchSuccess: (job, action) => {
      (job.loading = false), (job.error = null);

      job.jobResults.currPage = action.payload.data.currPage;
      job.jobResults.jobs = action.payload.data.data;
      job.jobResults.totalCount = action.payload.data.totalCount;
    },

    setJobStatusCode: (job, action) => {
      job.statusCode = action.payload;
    },
  },
});

const { jobCreateSuccess, jobRequested, jobRequestFailed, jobSearchSuccess } =
  slice.actions;
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

export const getSearchedJobs = (params: SearchJobQuery) =>
  apiCallBegan({
    url: "/job/searchJobs",
    params,
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobSearchSuccess.type,
  });

export default slice.reducer;
