import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { getCompanySelectedJob } from "../../store/slices/job";
import { useParams } from "react-router-dom";
import formatDate, { findDuration } from "../../utils/dateDuration";

import { IUser } from "../../interfaces/User";

import CreatedJobDesc from "../../components/job/CreatedJobDesc";

import JobApplicantBox from "../../components/job/JobApplicantBox";

function CreatedJobDetails() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const selectedJob = useSelector(
    (state: State) => state.entities.job.selectedJob
  );

  const applicants = selectedJob?.applicants as IUser[];

  useEffect(() => {
    dispatch(getCompanySelectedJob(jobId as string));
  }, [jobId]);

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-3 mb-10">
          <div className="w-14 h-14 ">
            <img
              className="h-full w-full object-cover"
              src={selectedJob?.company.logo}
              alt=""
            />
          </div>
          <div className="">
            <h1 className="text-zinc-700 text-xl font-semibold">
              {selectedJob?.title}
            </h1>
            <div className="flex">
              <p className="text-zinc-600 text-sm mr-3">
                {selectedJob?.company.name}
              </p>
              <p className="text-zinc-600 text-sm b-dot">
                {selectedJob?.location} ({selectedJob?.employmentType})
              </p>
            </div>
            <div className="">
              <p className="text-sm text-zinc-600">
                Created{" "}
                {formatDate(findDuration(selectedJob?.createdAt as Date))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-3/4 ">
            <CreatedJobDesc />
          </div>
          <div className="w-1/4">
            <JobApplicantBox jobId={jobId as string} applicants={applicants} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatedJobDetails;
