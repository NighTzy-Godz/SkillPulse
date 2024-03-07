import { IJob } from "../../interfaces/Job";

import { Link } from "react-router-dom";

interface SavedJobCardProps {
  data: IJob;
}

function SavedJobCard(props: SavedJobCardProps) {
  const { data } = props;
  const { title, company, location, employmentType, applicants, _id } = data;
  return (
    <div className="boxShadow2 rounded-lg flex gap-3 mb-5 px-5 py-3 ">
      <div className="sm:h-10 sm:w-10 w-8 h-8">
        <img
          className="w-full h-full object-cover rounded-full"
          src={company.logo}
          alt=""
        />
      </div>
      <div className="">
        <Link
          to={`/viewJob/${_id}`}
          className="text-zinc-600 font-semibold sm:text-xl text-base"
        >
          {title}
        </Link>
        <p>{company.name}</p>
        <p className="text-zinc-400">
          {location} ({employmentType})
        </p>
        <p className="text-green-500 text-sm">{applicants.length} applicants</p>
      </div>
    </div>
  );
}

export default SavedJobCard;
