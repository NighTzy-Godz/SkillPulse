import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  ApplicationStatus,
  IJobApplication,
} from "../../interfaces/JobApplication";
import ResumeView from "../ui/ResumeView";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { setShowResume } from "../../store/slices/ui";

interface ApplicantCardProps {
  data: IJobApplication;
  onUpdateJobApplication(status: ApplicationStatus, userId: string): void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  data,
  onUpdateJobApplication,
}) => {
  const { status, userId } = data;
  const dispatch = useDispatch();
  const { showResume } = useSelector((state: State) => state.entities.ui);

  const handleUpdateJobApplication = (newStatus: ApplicationStatus) => {
    onUpdateJobApplication(newStatus, userId._id);
  };

  const renderButtons = () => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return (
          <>
            <Button
              color="failure"
              size="sm"
              onClick={() =>
                handleUpdateJobApplication(ApplicationStatus.REJECTED)
              }
            >
              Reject
            </Button>
            <Button
              color="blue"
              onClick={() =>
                handleUpdateJobApplication(ApplicationStatus.PROCEEDING)
              }
            >
              Proceed
            </Button>
          </>
        );
      case ApplicationStatus.PROCEEDING:
        return (
          <>
            <Button
              color="failure"
              size="sm"
              onClick={() =>
                handleUpdateJobApplication(ApplicationStatus.REJECTED)
              }
            >
              Reject
            </Button>
            <Button
              color="success"
              onClick={() =>
                handleUpdateJobApplication(ApplicationStatus.ACCEPTED)
              }
            >
              Accept
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  const handleShowResume = () => {
    dispatch(setShowResume(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="boxShadow2 w-full p-3">
      <ResumeView showResume={showResume} resume={data.resume} />
      <div className="flex justify-between mb-2">
        <p className={`text-xs p-1 rounded-lg ${status.toLowerCase()}`}>
          {status}
        </p>
        <div className="">
          <p
            className="text-blue-500 cursor-pointer hover:underline text-sm"
            onClick={handleShowResume}
          >
            View Resume
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="mr-3 xl:w-1/4 lg:w-1/3">
          <img
            src={userId.pfp}
            className="w-20 h-20 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="xl:w-3/4 lg:w-2/3">
          <Link
            to={`/user/profile/${userId._id}`}
            className="cursor-pointer hover:underline text-zinc-700 font-semibold"
          >
            {`${userId.firstName} ${userId.lastName}`}
          </Link>
          <p className="text-zinc-500 text-sm flex">{userId.email}</p>
          <p className="text-zinc-500 text-sm">{userId.contact}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-3">{renderButtons()}</div>
    </div>
  );
};

export default ApplicantCard;
