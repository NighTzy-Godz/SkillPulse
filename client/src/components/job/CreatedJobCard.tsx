import React, { useState, useRef, useEffect } from "react";
import { IJob } from "../../interfaces/Job";
import { Link } from "react-router-dom";
import formatDate, { findDuration } from "../../utils/dateDuration";
import { BsThreeDots } from "react-icons/bs";
import { FaBriefcase } from "react-icons/fa6";
import { FaSuitcase, FaTrashAlt } from "react-icons/fa";

interface CreatedJobCardProps {
  data: IJob;
}

const CreatedJobCard: React.FC<CreatedJobCardProps> = ({ data: job }) => {
  const [isDotsClicked, setIsDotsClicked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsDotsClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);

  return (
    <div className="boxShadow2 relative rounded-lg mb-5 px-5 py-3 flex justify-between">
      <div className="flex gap-3 ">
        <div className="h-10 w-10">
          <img src={job.company.logo} alt="" />
        </div>
        <div className="">
          <Link
            to={`/company/createdJob/${job._id}`}
            className="text-zinc-600 font-semibold text-xl"
          >
            {job.title}
          </Link>
          <p>{job.company.name}</p>
          <p className="text-zinc-400">
            {job.location} ({job.employmentType})
          </p>

          <p className="text-zinc-400 text-sm mt-2">
            Created this job post {formatDate(findDuration(job.createdAt))}
          </p>
        </div>
      </div>
      <div className="flex gap-2 relative " ref={cardRef}>
        <div
          className="cursor-pointer h-fit"
          onClick={() => setIsDotsClicked(!isDotsClicked)}
        >
          <BsThreeDots className="w-6 h-6 text-zinc-500" />
        </div>

        <div
          className={`px-5 py-3 rounded-md boxShadow2 absolute right-0 w-60 top-5 ${
            isDotsClicked ? "animate-cardFadeIn" : "animate-cardFadeOut"
          }`}
        >
          <div className="flex items-center cursor-pointer  gap-2 mb-5">
            <FaSuitcase className="w-5 h-5 text-zinc-500" />
            <p className="text-zinc-500">Manage Job</p>
          </div>

          <div className="flex gap-2  cursor-pointer">
            <FaTrashAlt className="w-5 h-5 text-zinc-500" />
            <p className=" text-zinc-500">Delete Job</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedJobCard;
