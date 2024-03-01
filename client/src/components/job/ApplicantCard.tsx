import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  ApplicationStatus,
  IJobApplication,
} from "../../interfaces/JobApplication";

interface ApplicantCardProps {
  data: IJobApplication;
  onUpdateJobApplication(status: ApplicationStatus, userId: string): void;
}

function ApplicantCard({
  data: item,
  onUpdateJobApplication,
}: ApplicantCardProps) {
  const { status } = item;

  const renderButtons = () => {
    if (status === ApplicationStatus.PENDING) {
      return (
        <React.Fragment>
          <Button
            color="failure"
            size="sm"
            onClick={() =>
              onUpdateJobApplication(
                ApplicationStatus.REJECTED,
                item.userId._id
              )
            }
          >
            Reject
          </Button>
          <Button
            color="blue"
            onClick={() =>
              onUpdateJobApplication(
                ApplicationStatus.PROCEEDING,
                item.userId._id
              )
            }
          >
            Proceed
          </Button>
        </React.Fragment>
      );
    }
    if (status === ApplicationStatus.PROCEEDING) {
      return (
        <React.Fragment>
          <Button
            color="failure"
            size="sm"
            onClick={() =>
              onUpdateJobApplication(
                ApplicationStatus.REJECTED,
                item.userId._id
              )
            }
          >
            Reject
          </Button>
          <Button
            color="success"
            onClick={() =>
              onUpdateJobApplication(
                ApplicationStatus.ACCEPTED,
                item.userId._id
              )
            }
          >
            Accept
          </Button>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="boxShadow2  w-full p-3">
      <div className="flex justify-between mb-2">
        <p className={`text-xs p-1 rounded-lg ${item.status.toLowerCase()}`}>
          {item.status}
        </p>
        {}
        <div className="">
          <p className="text-blue-500 cursor-pointer hover:underline text-sm">
            View Resume
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="mr-3 xl:w-1/4 lg:w-1/3">
          <img
            src={item.userId.pfp}
            className="w-20 h-20 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="xl:w-3/4 lg:w-2/3 ">
          <Link
            to={`/user/profile/${item.userId._id}`}
            className="cursor-pointer hover:underline text-zinc-700 font-semibold"
          >
            {item.userId.firstName} {item.userId.lastName}
          </Link>

          <p className="text-zinc-500 text-sm flex ">{item.userId.email}</p>
          <p className="text-zinc-500 text-sm">{item.userId.contact}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-3">{renderButtons()}</div>
    </div>
  );
}

export default ApplicantCard;
