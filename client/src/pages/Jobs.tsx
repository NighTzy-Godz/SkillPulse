import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import jobLinks, { JobLink } from "../data/jobLinks";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { getAppliedJobs } from "../store/slices/job";
import AppliedJobCard from "../components/job/AppliedJobCard";
import NoJobData from "../components/job/NoJobData";

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
  }, []);

  const handleJobItemClick = (value: string) => {
    setSearchParams((prev) => {
      prev.set("value", value);
      return prev;
    });
  };

  const renderCategoryLength = (jobCategory: string) => {
    if (jobCategory === "APPLIED") return appliedJobs.length;
    return savedJobs.length;
  };

  const renderJobLinks = jobLinks.map((item) => {
    const isActive = item.value === jobItemValue;
    return (
      <li
        key={item.id}
        onClick={() => handleJobItemClick(item.value)}
        className={`p-3 border-l-4 border-t flex justify-between cursor-pointer ${
          isActive ? "customBorder" : ""
        } border-zinc-300 `}
      >
        <p className={` ${isActive ? "text-blue-500" : "text-zinc-500"}`}>
          {item.name}
        </p>
        <p className="text-sm text-zinc-500">
          {renderCategoryLength(item.value)}
        </p>
      </li>
    );
  });

  const renderAppliedJobs = () => {
    if (appliedJobs.length === 0) {
      return <NoJobData msg=" There is no Applied Jobs at the moment" />;
    }

    return appliedJobs.map((item) => {
      return <AppliedJobCard data={item} />;
    });
  };

  const renderContent = () => {
    if (jobItemValue === "APPLIED") {
      return renderAppliedJobs();
    }
    return <h1>I will show the cards for Saved</h1>;
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-4">
          <div className="w-1/3 boxShadow2 h-fit">
            <ul>
              <li className="flex gap-1 items-center p-3  ">
                <FaBookmark className="h-4 w-4 text-zinc-500" />
                <h1 className="text-zinc-500 text-lg font-semibold text-center ">
                  My Jobs
                </h1>
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
