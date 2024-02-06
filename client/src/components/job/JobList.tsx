import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import JobCard from "./JobCard";
import { IJob } from "../../interfaces/Job";

interface JobListProps {
  onJobSelectChange(data: IJob): void;
}

function JobList({ onJobSelectChange }: JobListProps) {
  const { jobs } = useSelector((state: State) => state.entities.job.jobResults);
  const selectedJob = useSelector(
    (state: State) => state.entities.job.selectedJob
  );

  const renderJobCards = jobs.map((item) => {
    return (
      <React.Fragment key={item._id}>
        <JobCard
          currJob={selectedJob as IJob}
          onJobSelectChange={onJobSelectChange}
          data={item}
        />
      </React.Fragment>
    );
  });

  return <div className="">{renderJobCards}</div>;
}

export default JobList;
