import React from "react";
import { IJob } from "../../interfaces/Job";
import { Link } from "react-router-dom";

interface JobCardProps {
  data: IJob;
  currJob: IJob;
  onJobSelectChange(data: IJob): void;
}

function JobCard({ currJob, data, onJobSelectChange }: JobCardProps) {
  const { _id, title, company, location, applicants } = data;

  const activeClass =
    currJob?._id === data._id ? "border border-green-500" : "";
  const currWidth = window.innerWidth;

  return (
    <div
      className={`boxShadow2 py-3 px-5 mb-2 cursor-pointer border rounded-md ${activeClass}`}
      onClick={() => onJobSelectChange(data)}
    >
      <div className="mb-4">
        {currWidth < 768 ? (
          <Link
            className="text-xl font-semibold text-blue-500 mb-1"
            to={`/viewJob/${_id}`}
            target="_blank"
          >
            {title}
          </Link>
        ) : (
          <h1 className="text-xl font-semibold text-blue-500 mb-1">{title}</h1>
        )}

        <p className="text-zinc-600 text-sm mb-1">{company.name}</p>
        <p className="text-zinc-500 text-sm ">{location}</p>
      </div>

      <div className="">
        <p className="text-green-600 text-sm">
          {" "}
          {applicants.length} Applicants
        </p>
      </div>
    </div>
  );
}

export default JobCard;
