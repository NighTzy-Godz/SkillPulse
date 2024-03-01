import React, { useEffect } from "react";
import JobHeader from "../../components/job/JobHeader";
import applicantsStatus from "../../data/applicantsStatus";
import JobLinks from "../../components/job/JobLinks";
import { useParams, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getJobApplicants,
  updateJobApplicationStatus,
} from "../../store/slices/job";
import { State } from "../../store/store";
import ApplicantCard from "../../components/job/ApplicantCard";
import {
  ApplicationStatus,
  IJobApplication,
  JobApplicationUpdateStatusData,
} from "../../interfaces/JobApplication";

function Applicants() {
  const { jobId } = useParams();

  const dispatch = useDispatch();
  const jobApplicants = useSelector(
    (state: State) => state.entities.job.jobApplicants
  );

  const [searchParams, setSearchParams] = useSearchParams({
    status: "PENDING",
  });
  const currApplicantStatus = searchParams.get("status");

  const filteredApplicants = jobApplicants.filter(
    (item) => item.status === currApplicantStatus
  );
  const handleLinkClick = (status: string) => {
    setSearchParams({ status });
  };

  const renderJobApplicants = () => {
    if (filteredApplicants.length === 0) {
      return (
        <h1 className="text-xl text-center text-zinc-700">
          No <span className="font-semibold">{`${currApplicantStatus}`}</span>{" "}
          applicants at the moment
        </h1>
      );
    }
    return (
      <div className="grid lg:grid-cols-2 gap-5 pb-10">
        {filteredApplicants.map((item) => (
          <React.Fragment key={item._id}>
            <ApplicantCard
              onUpdateJobApplication={handleUpdateJobApp}
              data={item}
            />
          </React.Fragment>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(getJobApplicants(jobId as string));
  }, [currApplicantStatus]);

  const handleUpdateJobApp = (status: ApplicationStatus, userId: string) => {
    const reqData: JobApplicationUpdateStatusData = {
      status,
      userId,
    };
    dispatch(updateJobApplicationStatus(reqData, jobId as string));
  };

  const findCategoryLength = (category: ApplicationStatus) => {
    const filteredArr = jobApplicants.filter((item) => {
      return item.status === category;
    });

    return filteredArr.length;
  };

  const renderCategoryLength = (category: string) => {
    let categoryLength = 0;
    if (category === "PENDING")
      categoryLength = findCategoryLength(ApplicationStatus.PENDING);
    if (category === "PROCEEDING")
      categoryLength = findCategoryLength(ApplicationStatus.PROCEEDING);
    if (category === "REJECTED")
      categoryLength = findCategoryLength(ApplicationStatus.REJECTED);
    if (category === "ACCEPTED")
      categoryLength = findCategoryLength(ApplicationStatus.ACCEPTED);

    return categoryLength;
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-4 ">
          <div className="w-1/3 boxShadow2 h-fit sticky   ">
            <ul>
              <li className="flex gap-1 items-center p-3">
                <JobHeader title="Applicants Status" />
              </li>
              {applicantsStatus.map((item) => {
                return (
                  <JobLinks
                    categoryLength={renderCategoryLength}
                    data={item}
                    key={item.id}
                    onJobItemClick={handleLinkClick}
                    isActive={currApplicantStatus === item.value}
                  />
                );
              })}
            </ul>
          </div>
          <div className="w-2/3 h-dvh ">{renderJobApplicants()}</div>
        </div>
      </div>
    </div>
  );
}

export default Applicants;
