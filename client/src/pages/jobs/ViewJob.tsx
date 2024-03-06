import { useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDescription from "../../components/job/JobDescription";
import { useDispatch, useSelector } from "react-redux";

import { State } from "../../store/store";
import { IJob } from "../../interfaces/Job";
import { userGetSelectedJob } from "../../store/slices/user";
import Loading from "../../components/common/Loading";

function ViewJob() {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { userSelectedJob, loading } = useSelector(
    (state: State) => state.entities.user
  );
  useEffect(() => {
    dispatch(userGetSelectedJob(jobId as string));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <JobDescription job={userSelectedJob as IJob} />
      </div>
    </div>
  );
}

export default ViewJob;
