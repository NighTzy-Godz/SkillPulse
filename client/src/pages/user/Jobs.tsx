import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { getAppliedJobs, getSavedJobs } from "../../store/slices/job";
import JobLinks from "../../components/job/JobLinks";
import JobHeader from "../../components/job/JobHeader";
import AppliedJobCard from "../../components/job/AppliedJobCard";
import SavedJobCard from "../../components/job/SavedJobCard";
import NoJobData from "../../components/job/NoJobData";
import userJobLinks from "../../data/userJobLinks";
import { IJobApplication } from "../../interfaces/JobApplication";
import { IJob } from "../../interfaces/Job";
import Loading from "../../components/common/Loading";

function Jobs() {
  const dispatch = useDispatch();
  const { appliedJobs, savedJobs, loading } = useSelector(
    (state: State) => state.entities.job
  );
  const [searchParams, setSearchParams] = useSearchParams({ value: "APPLIED" });
  const jobItemValue = searchParams.get("value");

  useEffect(() => {
    dispatch(getAppliedJobs());
    dispatch(getSavedJobs());
  }, []);

  const handleJobItemClick = (value: string) => {
    setSearchParams({ value });
  };

  const renderCategoryLength = (jobCategory: string) => {
    return jobCategory === "APPLIED" ? appliedJobs.length : savedJobs.length;
  };

  const renderContent = () => {
    if (loading) return <Loading />;
    const jobsToRender = jobItemValue === "APPLIED" ? appliedJobs : savedJobs;
    if (jobsToRender.length === 0) {
      return (
        <NoJobData
          msg={` There are no ${
            jobItemValue === "APPLIED" ? "Applied" : "Saved"
          } Jobs at the moment`}
        />
      );
    }

    return jobsToRender.map((item) =>
      jobItemValue === "APPLIED" ? (
        <AppliedJobCard key={item._id} data={item as IJobApplication} />
      ) : (
        <SavedJobCard key={item._id} data={item as IJob} />
      )
    );
  };

  return (
    <div className="py-10 min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="sm:flex gap-4">
          <div className="sm:w-1/3 sm:mb-0 mb-8 boxShadow2 h-fit">
            <ul>
              <li className="flex gap-1 items-center p-3">
                <JobHeader title="My Jobs" />
              </li>
              {userJobLinks.map((item) => (
                <JobLinks
                  key={item.id}
                  data={item}
                  isActive={item.value === jobItemValue}
                  onJobItemClick={handleJobItemClick}
                  categoryLength={renderCategoryLength}
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

export default Jobs;
