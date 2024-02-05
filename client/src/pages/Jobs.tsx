import { TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSearchedJobs } from "../store/slices/job";
import { State } from "../store/store";
import JobList from "../components/job/JobList";
import JobDescription from "../components/job/JobDescription";
import { IJob, SearchJobQuery } from "../interfaces/Job";
import ReactPaginate from "react-paginate";

import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/common/SearchBar";
import NoJobSearch from "../components/job/NoJobSearch";

function Jobs() {
  const { jobs, totalCount } = useSelector(
    (state: State) => state.entities.job.jobResults
  );

  const [searchedJob, setSearchJob] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({
    jobSearch: "",
    page: "1",
  });

  const jobSearch = searchParams.get("jobSearch");
  const page = searchParams.get("page");

  const queryData: SearchJobQuery = {
    jobSearch,
    page: parseInt(page as string),
  };
  const [selectedJob, setSelectedJob] = useState<IJob>(jobs[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSearchedJobs(queryData));
  }, [page]);

  useEffect(() => {
    if (jobs.length > 0) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs]);

  const handleSelectJobChange = (job: IJob) => {
    setSelectedJob(job);
  };

  const handlePageChange = ({ selected: page }: any) => {
    setSearchParams(
      (prev) => {
        prev.set("page", (parseInt(page) + 1).toString());

        return prev;
      },
      { replace: true }
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("jobSearch", e.currentTarget.value);
        return prev;
      },
      { replace: true }
    );
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchParams((prev) => {
      prev.set("page", "1");
      return prev;
    });

    setSearchJob(jobSearch as string);

    const formQueryData: SearchJobQuery = {
      ...queryData,
      page: 1,
    };

    dispatch(getSearchedJobs(formQueryData));
  };

  const renderContent = () => {
    if (jobs.length > 0)
      return (
        <div className="flex gap-4 max-h-[82dvh]">
          <div className="w-2/5  max-h-screen overflow-y-auto">
            <JobList
              currJob={selectedJob}
              onJobSelectChange={handleSelectJobChange}
            />
            <ReactPaginate
              forcePage={parseInt(page as string) - 1}
              className="paginate flex flex-wrap gap-2 my-5"
              activeClassName="paginate_active"
              nextLabel=">"
              pageCount={totalCount / 15}
              previousLabel="< "
              onPageChange={handlePageChange}
            />
          </div>

          <JobDescription job={selectedJob} />
        </div>
      );

    return <NoJobSearch jobSearch={searchedJob} />;
  };

  return (
    <div className="py-10 ">
      <div className="container mx-auto overflow-hidden">
        <form className="mb-5" onSubmit={handleFormSubmit}>
          <SearchBar
            value={jobSearch as string}
            placeholder="Search Job Here ..."
            onChange={handleSearchChange}
          />
        </form>
        <div className="mb-5"></div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Jobs;