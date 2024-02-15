import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

import formatMoney from "../../utils/formatMoney";
import CreatedJobUpdateModal from "../modal/CreatedJobUpdateModal";
import { useSelector } from "react-redux";
import { State } from "../../store/store";

function CreatedJobDesc() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedJob = useSelector(
    (state: State) => state.entities.job.selectedJob
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-8 py-5 border border-zinc-300 relative">
      <CreatedJobUpdateModal
        isModalOpen={isModalOpen}
        onModalClose={handleCloseModal}
      />
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-zinc-700 text-xl">Job Description</h1>
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <FaPen className="h-5 w-5 text-zinc-600" />
        </div>
      </div>

      <div className="mb-5">
        <p className="text-zinc-600 ">
          <span className="text-zinc-700 font-semibold">Location:</span>{" "}
          {selectedJob?.location}
        </p>
        <p className="text-zinc-600 ">
          <span className="text-zinc-700 font-semibold">Salary:</span>{" "}
          {formatMoney(selectedJob?.salary as string)}
        </p>
        <p className="text-zinc-600 ">
          <span className="text-zinc-700 font-semibold">Employment Type:</span>{" "}
          {selectedJob?.employmentType}
        </p>
      </div>

      <div className="">
        <p className="whitespace-pre-wrap text-zinc-600">
          {selectedJob?.description}
        </p>
      </div>
    </div>
  );
}

export default CreatedJobDesc;
