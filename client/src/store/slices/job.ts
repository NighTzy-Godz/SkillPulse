import { createSlice } from "@reduxjs/toolkit";
import {
  CreateJobData,
  IJob,
  SaveUnsaveJobData,
  SearchJobQuery,
  SearchJobResponse,
} from "../../interfaces/Job";
import { apiCallBegan } from "../actions/apiActions";
import { IJobApplication } from "../../interfaces/JobApplication";

interface JobState {
  error: null | string;
  loading: boolean;
  statusCode: null | number;

  jobResults: SearchJobResponse;
  selectedJob: null | IJob;

  appliedJobs: IJobApplication[];
  savedJobs: IJob[];
  createdJobs: IJob[];
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
  appliedJobs: [],
  savedJobs: [],
  createdJobs: [],
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

      job.jobResults.jobs[index] = responseJob;
    },

    jobSelectSuccess: (job, action) => {
      job.loading = false;
      job.error = null;
      job.selectedJob = action.payload.data;
    },

    jobUpdateSuccess: (job, action) => {
      job.loading = false;
      job.error = null;
      job.selectedJob = action.payload.data;

      job.statusCode = action.payload.status;
    },

    jobDeleteSuccess: (job, action) => {
      job.statusCode = action.payload.status;
      job.loading = false;
      job.error = null;

      const filteredCreatedJobs = job.createdJobs.filter(
        (item) => item._id !== action.payload.data._id
      );
      job.createdJobs = filteredCreatedJobs;
    },

    appliedJobListSuccess: (job, action) => {
      job.loading = false;
      job.error = null;
      job.appliedJobs = action.payload.data;
    },

    createdJobListSuccess: (job, action) => {
      job.loading = false;
      job.error = null;
      job.createdJobs = action.payload.data;
    },

    savedJobListSuccess: (job, action) => {
      job.loading = false;
      job.error = null;
      job.savedJobs = action.payload.data;
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
  appliedJobListSuccess,
  createdJobListSuccess,
  jobCreateSuccess,
  jobSelectSuccess,
  jobRequested,
  jobRequestFailed,
  jobSearchSuccess,
  jobUpdateSuccess,
  jobSaveUnsaveSuccess,
  jobDeleteSuccess,
  savedJobListSuccess,
} = slice.actions;
export const { setJobStatusCode, setUserSelectedJob } = slice.actions;

export const getSearchedJobs = (params: SearchJobQuery) =>
  apiCallBegan({
    url: "/job/searchJobs",
    params,
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobSearchSuccess.type,
  });

export const getCompanySelectedJob = (jobId: string) =>
  apiCallBegan({
    url: `/job/getJobDescription/${jobId}`,
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobSelectSuccess.type,
  });

export const getAppliedJobs = () =>
  apiCallBegan({
    url: "/job/getAppliedJobs",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: appliedJobListSuccess.type,
  });

export const getSavedJobs = () =>
  apiCallBegan({
    url: "/job/getSavedJobs",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: savedJobListSuccess.type,
  });

export const getCreatedJobs = () =>
  apiCallBegan({
    url: "/job/getJobsCreated",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: createdJobListSuccess.type,
  });

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

export const updateJob = (data: CreateJobData, jobId: string) =>
  apiCallBegan({
    url: `/job/updateJob/${jobId}`,
    data,
    method: "PUT",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobUpdateSuccess.type,
    successMsg: "Successfully Updated the Job Post",
  });

export const deleteJob = (jobId: string) =>
  apiCallBegan({
    url: `/job/deleteJob/${jobId}`,
    method: "DELETE",
    onStart: jobRequested.type,
    onError: jobRequestFailed.type,
    onSuccess: jobDeleteSuccess.type,
    successMsg: "Successfully Deleted the Job Post",
  });
export default slice.reducer;
