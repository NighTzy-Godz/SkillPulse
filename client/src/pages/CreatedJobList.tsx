import React, { useEffect } from "react";
import JobHeader from "../components/job/JobHeader";
import companyJobLinks from "../data/companyJobLinks";
import JobLinks from "../components/job/JobLinks";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { getCreatedJobs } from "../store/slices/job";
import CreatedJobCard from "../components/job/CreatedJobCard";
import NoJobData from "../components/job/NoJobData";

function CreatedJobList() {
  const dispatch = useDispatch();
  const createdJobs = useSelector(
    (state: State) => state.entities.job.createdJobs
  );
  const [searchParams, setSearchParams] = useSearchParams({
    value: "JOB_POSTS",
  });
  const jobItemValue = searchParams.get("value");

  useEffect(() => {
    dispatch(getCreatedJobs());
  }, []);

  // const renderCategoryLength = (jobCategory: string) => {
  //   return jobCategory === "APPLIED" ? appliedJobs.length : savedJobs.length;
  // };

  const renderCreatedJobs = createdJobs.map((item) => {
    return (
      <div className="mb-3" key={item._id}>
        {" "}
        <CreatedJobCard data={item} />
      </div>
    );
  });

  const renderContent = () => {
    if (createdJobs.length === 0)
      return <NoJobData addLink={false} msg="You dont have" />;

    return renderCreatedJobs;
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-4">
          <div className="w-1/3 boxShadow2 h-fit">
            <ul>
              <li className="flex gap-1 items-center p-3">
                <JobHeader title="Company Item" />
              </li>
              {companyJobLinks.map((item) => (
                <JobLinks
                  key={item.id}
                  data={item}
                  isActive={item.value === jobItemValue}
                  onJobItemClick={() => {}}
                />
              ))}
            </ul>
          </div>

          <div className="w-2/3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default CreatedJobList;
