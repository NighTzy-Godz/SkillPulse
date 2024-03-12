import React, { useEffect } from "react";
import JobHeader from "../../components/job/JobHeader";
import companyJobLinks from "../../data/companyJobLinks";
import JobLinks from "../../components/job/JobLinks";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { getCreatedJobs } from "../../store/slices/job";
import CreatedJobCard from "../../components/job/CreatedJobCard";
import NoJobData from "../../components/job/NoJobData";
import Loading from "../../components/common/Loading";

function CreatedJobList() {
  const dispatch = useDispatch();
  const { createdJobs, loading } = useSelector(
    (state: State) => state.entities.job
  );
  const [searchParams, setSearchParams] = useSearchParams({
    value: "JOB_POSTS",
  });
  const jobItemValue = searchParams.get("value");

  useEffect(() => {
    dispatch(getCreatedJobs());
  }, []);

  const renderCreatedJobs = createdJobs.map((item) => {
    return (
      <div className="mb-3" key={item._id}>
        {" "}
        <CreatedJobCard data={item} />
      </div>
    );
  });

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (createdJobs.length === 0)
      return <NoJobData addLink={false} msg="You dont have any job posts" />;

    return renderCreatedJobs;
  };

  return (
    <div className="py-10 min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="sm:flex gap-4">
          <div className="sm:w-1/3 sm:mb-0 mb-8 boxShadow2 h-fit">
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

          <div className="sm:w-2/3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default CreatedJobList;
