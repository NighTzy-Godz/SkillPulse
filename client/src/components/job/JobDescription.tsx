import React, { useEffect, useState } from "react";
import customBtnTheme from "../../utils/customBtnTheme";
import { Button } from "flowbite-react";
import { IJob, SaveUnsaveJobData } from "../../interfaces/Job";

import formatDate, { findDuration } from "../../utils/dateDuration";
import formatMoney from "../../utils/formatMoney";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import {
  setUserSelectedJob,
  userSaveJob,
  userUnsaveJob,
} from "../../store/slices/job";
import { toast } from "react-toastify";

interface JobDescriptionProps {
  job: IJob;
}

function JobDescription({ job }: JobDescriptionProps) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isApplying = pathname.includes("applyJob");

  const selectedJob = useSelector(
    (state: State) => state.entities.job.selectedJob
  );
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  const {
    _id,
    title,
    company,
    createdAt,
    applicants,
    description,
    employmentType,
    location,
    salary,
    savedBy,
  } = job || {};

  const hasApplied = applicants?.find((item) => item === currUserId);
  const hasSaved = !!savedBy?.find((item) => item === currUserId);

  const [jobSaved, setJobSaved] = useState(hasSaved);
  useEffect(() => {
    setJobSaved(hasSaved);
  }, [hasSaved]);

  useEffect(() => {}, [selectedJob]);

  const handleSaveJob = (jobId: string) => {
    if (!currUserId) return toast.error("Login first before saving this job");

    const reqBody: SaveUnsaveJobData = {
      jobId,
    };
    setJobSaved(!jobSaved);

    if (jobSaved) return dispatch(userUnsaveJob(reqBody));
    return dispatch(userSaveJob(reqBody));
  };

  const renderApplyButton = () => {
    if (hasApplied) {
      return (
        <Button color="blue" theme={customBtnTheme}>
          Applied
        </Button>
      );
    }

    if (!currUserId)
      return (
        <Button
          color="blue"
          theme={customBtnTheme}
          onClick={() => {
            if (!currUserId)
              return toast.error("Login first before saving this job");
          }}
        >
          Apply Job
        </Button>
      );

    return (
      <Link
        to={`/user/applyJob/${_id}`}
        className="transition-all text-sm px-3 flex items-center rounded-lg duration-200 text-center text-white bg-blue-500 border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
      >
        Apply Now
      </Link>
    );
  };

  return (
    <div className=" ">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-1 text-zinc-700 ">{title}</h1>
        <div className="flex gap-1 flex-wrap mb-4">
          {" "}
          <p className="text-sm text-zinc-700">{company?.name}</p>
          <p className="text-sm text-zinc-700 b-dot">{location}</p>
          <p className="text-sm text-zinc-500 b-dot">
            {formatDate(findDuration(createdAt as Date))}
          </p>
          <p className="text-sm text-green-600 font-semibold b-dot">
            {applicants?.length} Applicants
          </p>
        </div>

        <div className="mb-5">
          <p className=" b-dot text-zinc-500 mb-1">{employmentType}</p>
          <p className=" b-dot  text-zinc-700 ">
            {formatMoney(salary as string)}
          </p>
        </div>

        {!isApplying && (
          <div className="flex gap-4">
            {renderApplyButton()}
            <Button
              color="customGreen"
              theme={customBtnTheme}
              onClick={() => handleSaveJob(_id as string)}
            >
              {jobSaved ? "Unsave Job" : "Save Job"}
            </Button>
          </div>
        )}
      </div>

      <div className="pb-6">
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
}

export default JobDescription;
