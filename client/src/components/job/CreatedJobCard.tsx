import React from "react";
import { IJob } from "../../interfaces/Job";
import { Link } from "react-router-dom";
import formatDate, { findDuration } from "../../utils/dateDuration";
import { BsThreeDots } from "react-icons/bs";
import { Card } from "flowbite-react";

interface CreatedJobCardProps {
  data: IJob;
}

function CreatedJobCard({ data: job }: CreatedJobCardProps) {
  return (
    <div className="boxShadow2 relative rounded-lg mb-5 px-5 py-3 flex justify-between">
      <div className="flex gap-3 ">
        <div className="h-10 w-10">
          <img src={job.company.logo} alt="" />
        </div>
        <div className="">
          <Link
            to={`/viewJob/${job._id}`}
            className="text-zinc-600 font-semibold text-xl"
          >
            {job.title}
          </Link>
          <p>{job.company.name}</p>
          <p className="text-zinc-400">
            {job.location} ({job.employmentType})
          </p>

          <p className="text-zinc-400 text-sm mt-2">
            Created this job post {formatDate(findDuration(job.createdAt))}
          </p>
        </div>
      </div>
      <div className="flex gap-2 relative ">
        <div className="cursor-pointer h-fit">
          <BsThreeDots className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default CreatedJobCard;
