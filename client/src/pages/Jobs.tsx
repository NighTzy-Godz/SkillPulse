import React, { useEffect, useState } from "react";

import { Link, Outlet, useSearchParams } from "react-router-dom";
import jobLinks, { JobLink } from "../data/jobLinks";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { getAppliedJobs, getSavedJobs } from "../store/slices/job";
import AppliedJobCard from "../components/job/AppliedJobCard";
import NoJobData from "../components/job/NoJobData";
import SavedJobCard from "../components/job/SavedJobCard";

import JobLinks from "../components/job/JobLinks";
import JobHeader from "../components/job/JobHeader";

function Jobs() {
  const dispatch = useDispatch();

  const appliedJobs = useSelector(
    (state: State) => state.entities.job.appliedJob
  );

  const savedJobs = useSelector((state: State) => state.entities.job.savedJobs);

  const [searchParams, setSearchParams] = useSearchParams({ value: "APPLIED" });
  const jobItemValue = searchParams.get("value");

  useEffect(() => {
    dispatch(getAppliedJobs());
    dispatch(getSavedJobs());
  }, []);

  const handleJobItemClick = (value: string) => {
    setSearchParams((prev) => {
      prev.set("value", value);
      return prev;
    });
  };

  const renderCategoryLength = (jobCategory: string) => {
    return jobCategory === "APPLIED" ? appliedJobs.length : savedJobs.length;
  };

  const renderJobLinks = jobLinks.map((item) => {
    const isActive = item.value === jobItemValue;
    return (
      <React.Fragment key={item.id}>
        <JobLinks
          data={item}
          isActive={isActive}
          onJobItemClick={handleJobItemClick}
          categoryLength={renderCategoryLength}
        />
      </React.Fragment>
    );
  });

  const renderAppliedJobs = () => {
    if (appliedJobs.length === 0) {
      return <NoJobData msg=" There is no Applied Jobs at the moment" />;
    }

    return appliedJobs.map((item) => {
      return (
        <React.Fragment key={item._id}>
          <AppliedJobCard data={item} />
        </React.Fragment>
      );
    });
  };

  const renderSavedJobs = () => {
    if (savedJobs.length === 0) {
      return <NoJobData msg=" There is no Saved Jobs at the moment" />;
    }

    return savedJobs.map((item) => {
      return <SavedJobCard data={item} />;
    });
  };

  const renderContent = () => {
    return jobItemValue === "APPLIED" ? renderAppliedJobs() : renderSavedJobs();
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-4">
          <div className="w-1/3 boxShadow2 h-fit">
            <ul>
              <li className="flex gap-1 items-center p-3  ">
                <JobHeader title="My Jobs" />
              </li>

              {renderJobLinks}
            </ul>
          </div>
          <div className="w-2/3 ">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
