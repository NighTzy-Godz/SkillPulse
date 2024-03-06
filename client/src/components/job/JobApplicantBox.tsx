import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/User";
import { useSelector } from "react-redux";
import { State } from "../../store/store";

interface JobApplicantBoxProps {
  applicants: IUser[];
  jobId: string;
}

function JobApplicantBox({ jobId, applicants }: JobApplicantBoxProps) {
  const currUserCompanyId = useSelector(
    (state: State) => state.entities.auth.decodedModel?.company
  );
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
          className="flex gap-2 items-center mb-2"
          key={item._id}
        >
          {" "}
          <div className=" ">
            <img
              className="rounded-full h-10 w-10 object-cover"
              src={item.pfp}
              alt=""
            />
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
    <div className=" border border-zinc-300 p-5 h-fit">
      {applicants.length > 0 && (
        <Link
          to={`/company/${currUserCompanyId}/${jobId}/applicants`}
          className="text-xs block text-blue-500 hover:underline"
        >
          See All Applicants
        </Link>
      )}

      <h1 className="text-zinc-700 mb-5  text-xl">
        Applicants Count:
        <span className="text-zinc-600 font-semibold">
          {" "}
          {applicants?.length}
        </span>
      </h1>
      {renderApplicants()}
    </div>
  );
}

export default JobApplicantBox;
