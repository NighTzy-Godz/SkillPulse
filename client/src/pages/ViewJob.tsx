import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDescription from "../components/job/JobDescription";
import { useDispatch } from "react-redux";
import { setUserSelectedJob } from "../store/slices/job";

function ViewJob() {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  useEffect(() => {
    dispatch(setUserSelectedJob(jobId));
  }, [jobId]);
  return (
    <div className="py-10">
      <div className="container mx-auto">
        <JobDescription />
        <h1>View Job Here {jobId}</h1>
      </div>
    </div>
  );
}

export default ViewJob;
