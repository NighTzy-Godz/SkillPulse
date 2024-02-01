import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import customBtnTheme from "../utils/customBtnTheme";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedJobs } from "../store/slices/job";
import { State } from "../store/store";
import JobList from "../components/job/JobList";
import JobDescription from "../components/job/JobDescription";
import { IJob } from "../interfaces/Job";
function Jobs() {
  const { jobs, currPage, totalCount } = useSelector(
    (state: State) => state.entities.job.jobResults
  );

  const [jobSearchQuery, setJobSearchQuery] = useState({
    jobSearch: "",
    page: 1,
  });

  const [selectedJob, setSelectedJob] = useState<IJob>(jobs[10]);

  const dispatch = useDispatch();

  console.log(currPage);
  useEffect(() => {
    dispatch(getSearchedJobs(jobSearchQuery));
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs]);

  const handleSelectJobChange = (job: IJob) => {
    setSelectedJob(job);
  };

  return (
    <div className="py-10 ">
      <div className="container mx-auto overflow-hidden">
        <div className="flex gap-4 max-h-[82dvh]">
          <JobList
            currPage={currPage}
            currJob={selectedJob}
            onJobSelectChange={handleSelectJobChange}
          />
          <JobDescription job={selectedJob} />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
