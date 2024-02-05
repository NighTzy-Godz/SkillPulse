import React from "react";
import customBtnTheme from "../../utils/customBtnTheme";
import { Button } from "flowbite-react";
import { IJob } from "../../interfaces/Job";

import formatDate, { findDuration } from "../../utils/dateDuration";
import formatMoney from "../../utils/formatMoney";
import { Link } from "react-router-dom";

interface JobDescriptionProps {
  job: IJob;
}

function JobDescription({ job }: JobDescriptionProps) {
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
  } = job || {};

  return (
    <div className="w-3/5 max-h-screen  overflow-y-auto p-5 ">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-1 text-zinc-700 ">{title}</h1>
        <div className="flex gap-1 flex-wrap mb-4">
          {" "}
          <p className="text-sm text-zinc-700">{company?.name}</p>
          <p className="text-sm text-zinc-700 b-dot">{location}</p>
          <p className="text-sm text-zinc-500 b-dot">
            {formatDate(findDuration(createdAt))}
          </p>
          <p className="text-sm text-green-600 font-semibold b-dot">
            {applicants?.length} Applicants
          </p>
        </div>

        <div className="mb-5">
          <p className=" b-dot text-zinc-500 mb-1">{employmentType}</p>
          <p className=" b-dot  text-zinc-700 ">{formatMoney(salary)}</p>
        </div>

        <div className="flex gap-4">
          <Link
            to={`/user/applyJob/${_id}`}
            className="transition-all text-sm px-3 flex items-center rounded-lg duration-200 text-center text-white bg-blue-500 border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Apply Now
          </Link>
          <Button color="customGreen" theme={customBtnTheme}>
            Save Job
          </Button>
        </div>
      </div>

      <div className="pb-6">
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
}

export default JobDescription;
