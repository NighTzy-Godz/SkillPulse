import { createSlice } from "@reduxjs/toolkit";
import {
  CreateJobData,
  IJob,
  SaveUnsaveJobData,
  SearchJobQuery,
  SearchJobResponse,
} from "../../interfaces/Job";
import { apiCallBegan } from "../actions/apiActions";

interface JobState {
  error: null | string;
  loading: boolean;
  statusCode: null | number;

  jobResults: SearchJobResponse;
  selectedJob: null | IJob;
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
  selectedJob: null,
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

    jobSaveUnsaveSuccess: (job, action) => {
      const responseJob = action.payload.data;
      job.loading = false;
      job.error = null;
      job.selectedJob = responseJob;
      const index = job.jobResults.jobs.findIndex(
        (item) => item._id === action.payload.data._id
      );
      console.log(responseJob);
      job.jobResults.jobs[index] = responseJob;
    },

    setJobStatusCode: (job, action) => {
      job.statusCode = action.payload;
    },

    setUserSelectedJob: (job, action) => {
      job.selectedJob = action.payload;
    },
  },
});

const {
  jobCreateSuccess,
  jobRequested,
  jobRequestFailed,
  jobSearchSuccess,
  jobSaveUnsaveSuccess,
} = slice.actions;
export const { setJobStatusCode, setUserSelectedJob } = slice.actions;

export const userSaveJob = (data: SaveUnsaveJobData) =>
  apiCallBegan({
    url: "job/saveJob",
    data,
    method: "POST",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobSaveUnsaveSuccess.type,
    successMsg: "Saved the job!",
  });

export const userUnsaveJob = (data: SaveUnsaveJobData) =>
  apiCallBegan({
    url: "job/unsaveJob",
    data,
    method: "POST",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobSaveUnsaveSuccess.type,
    successMsg: "Unsaved the job!",
  });

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
