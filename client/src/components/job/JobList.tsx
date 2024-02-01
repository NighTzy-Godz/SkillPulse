import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import JobCard from "./JobCard";
import { IJob } from "../../interfaces/Job";

interface JobListProps {
  onJobSelectChange(data: IJob): void;
  currJob: IJob;
}

function JobList({ currJob, onJobSelectChange }: JobListProps) {
  const { jobs } = useSelector((state: State) => state.entities.job.jobResults);

  const renderJobCards = jobs.map((item) => {
    return (
      <React.Fragment key={item._id}>
        <JobCard
          currJob={currJob}
          onJobSelectChange={onJobSelectChange}
          data={item}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="w-2/5  max-h-screen overflow-y-auto">{renderJobCards}</div>
  );
}

export default JobList;
