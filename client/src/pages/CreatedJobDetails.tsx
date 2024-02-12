import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { getCompanySelectedJob } from "../store/slices/job";
import { Link, useParams } from "react-router-dom";
import formatDate, { findDuration } from "../utils/dateDuration";
import { FaPen } from "react-icons/fa";
import { IUser } from "../interfaces/User";
import formatMoney from "../utils/formatMoney";
function CreatedJobDetails() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const selectedJob = useSelector(
    (state: State) => state.entities.job.selectedJob
  );

  const applicants = selectedJob?.applicants as IUser[];

  useEffect(() => {
    dispatch(getCompanySelectedJob(jobId as string));
  }, []);

  const renderApplicants = () => {
    if (applicants?.length === 0) {
      return (
        <h1 className="text-center text-zinc-600 font-semibold">
          No Applicants at the moment
        </h1>
      );
    }

    return applicants?.map((item, index) => {
      return (
        <Link
          to={`/user/profile/${item._id}`}
          className="flex gap-2 items-center"
          key={item._id}
        >
          {" "}
          <div className="h-10 w-10 ">
            <img className="rounded-full" src={item.pfp} alt="" />
          </div>
          <div className="">
            <h1 className="font-semibold text-sm text-zinc-700">
              {item.firstName} {item.lastName}
            </h1>

            <p className="text-xs text-zinc-500">Applicant #{index + 1}</p>
          </div>
        </Link>
      );
    });
  };
  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-3 mb-10">
          <div className="w-14 h-14 bg-red-500">
            <img src={selectedJob?.company.logo} alt="" />
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
          {" "}
          <div className="w-3/4 px-8 py-5 border border-zinc-300 relative">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-zinc-700 text-xl">Job Description</h1>
              <div className="cursor-pointer">
                <FaPen className="h-5 w-5 text-zinc-600" />
              </div>
            </div>

            <div className="mb-5">
              <p className="text-zinc-600 ">
                <span className="text-zinc-700 font-semibold">Location:</span>{" "}
                {selectedJob?.location}
              </p>
              <p className="text-zinc-600 ">
                <span className="text-zinc-700 font-semibold">Salary:</span>{" "}
                {formatMoney(selectedJob?.salary as string)}
              </p>
              <p className="text-zinc-600 ">
                <span className="text-zinc-700 font-semibold">
                  Employment Type:
                </span>{" "}
                {selectedJob?.employmentType}
              </p>
            </div>

            <div className="">
              <p className="whitespace-pre-wrap text-zinc-600">
                {selectedJob?.description}
              </p>
            </div>
          </div>
          <div className="w-1/4 border border-zinc-300 p-5 h-fit">
            <h1 className="text-zinc-700 mb-5  text-xl">
              Applicants Count:
              <span className="text-zinc-600 font-semibold">
                {" "}
                {selectedJob?.applicants.length}
              </span>
            </h1>

            {renderApplicants()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatedJobDetails;
