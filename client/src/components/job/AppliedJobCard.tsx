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
        <div className="sm:h-10 sm:w-10 h-8 w-8">
          <img
            className="h-full w-full object-cover rounded-full"
            src={job.company.logo}
            alt=""
          />
        </div>
        <div className="">
          <Link
            to={`/viewJob/${job._id}`}
            className="text-zinc-600 font-semibold sm:text-xl text-base"
          >
            {job.title}
          </Link>
          <p className="text-zinc-600 sm:text-base text-xs">
            {job.company.name}
          </p>
          <p className="text-zinc-400 sm:text-base text-xs">
            {job.location} ({job.employmentType})
          </p>
        </div>
      </div>
      <div className="flex gap-2 ">
        <span
          className={`h-fit sm:text-xs text-[10px]  px-1.5 py-1 font-semibold rounded-lg  ${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default AppliedJobCard;
