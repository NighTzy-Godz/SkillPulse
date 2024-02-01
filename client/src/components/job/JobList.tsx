import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import JobCard from "./JobCard";
import { IJob } from "../../interfaces/Job";
import ReactPaginate from "react-paginate";

interface JobListProps {
  onJobSelectChange(data: IJob): void;
  currJob: IJob;
  currPage: number;
}

function JobList({ currPage, currJob, onJobSelectChange }: JobListProps) {
  const { jobs, totalCount } = useSelector(
    (state: State) => state.entities.job.jobResults
  );

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
    <div className="w-2/5  max-h-screen overflow-y-auto">
      {renderJobCards}

      <ReactPaginate
        forcePage={currPage - 1}
        className="paginate flex flex-wrap gap-2 my-5"
        activeClassName="paginate_active"
        nextLabel=">"
        pageCount={totalCount / 15}
        previousLabel="< "
      />
    </div>
  );
}

export default JobList;
