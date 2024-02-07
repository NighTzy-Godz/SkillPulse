import { IJobApplication } from "../../interfaces/JobApplication";
import { Link } from "react-router-dom";

interface AppliedJobCardProps {
  data: IJobApplication;
}

function AppliedJobCard(props: AppliedJobCardProps) {
  const { data } = props;
  const { jobId: job, status } = data;

  return (
    <div className="boxShadow2 rounded-lg mb-5 px-5 py-3 flex justify-between">
      <div className="flex gap-3">
        <div className="h-10 w-10">
          <img src={job.company.logo} alt="" />
        </div>
        <div className="">
          <Link
            to={`/viewJob/${job._id}`}
            className="text-zinc-600 font-semibold text-xl"
          >
            {job.title}
          </Link>
          <p>{job.company.name}</p>
          <p className="text-zinc-400">
            {job.location} ({job.employmentType})
          </p>
        </div>
      </div>
      <div className="flex gap-2 ">
        <span
          className={`h-fit text-xs px-1.5 py-1 font-semibold rounded-lg ${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default AppliedJobCard;
