import React, { useState, useRef, useEffect } from "react";
import { IJob } from "../../interfaces/Job";
import { Link } from "react-router-dom";
import formatDate, { findDuration } from "../../utils/dateDuration";
import { BsThreeDots } from "react-icons/bs";
import { FaBriefcase } from "react-icons/fa6";
import { FaSuitcase, FaTrashAlt } from "react-icons/fa";
import DeleteJobModal from "../modal/DeleteJobModal";
import { useSelector } from "react-redux";
import { State } from "../../store/store";

interface CreatedJobCardProps {
  data: IJob;
}

const CreatedJobCard: React.FC<CreatedJobCardProps> = ({ data: job }) => {
  const currUserCompanyId = useSelector(
    (state: State) => state.entities.auth.decodedModel?.company
  );
  const [isDotsClicked, setIsDotsClicked] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

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

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className="boxShadow2 relative rounded-lg  px-5 py-3 flex justify-between">
      <DeleteJobModal
        currJob={job}
        isShowModal={isShowModal}
        onCloseModal={handleCloseModal}
      />
      <div className="flex gap-3 ">
        <div className="h-16 w-16">
          <img
            className="w-full h-full object-cover rounded-full"
            src={job.company.logo}
            alt=""
          />
        </div>
        <div className="">
          <Link
            to={`/company/${currUserCompanyId}/createdJob/${job._id}`}
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
            isDotsClicked ? "animate-cardFadeIn" : " animate-cardFadeOut"
          }`}
        >
          <div className="flex  cursor-pointer  gap-2 mb-5">
            <FaSuitcase className="w-5 h-5 text-zinc-500" />
            <Link
              to={`/company/createdJob/${job._id}`}
              className="text-zinc-500"
            >
              Manage Job
            </Link>
          </div>

          <div
            className="flex gap-2  cursor-pointer"
            onClick={() => setIsShowModal(true)}
          >
            <FaTrashAlt className="w-5 h-5 text-zinc-500" />
            <p className=" text-zinc-500">Delete Job</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedJobCard;
