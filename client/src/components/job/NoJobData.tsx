import React from "react";
import { Link } from "react-router-dom";

interface NoJobDataProps {
  msg: string;
}

function NoJobData({ msg }: NoJobDataProps) {
  return (
    <div className="text-center ">
      <h1 className="text-xl text-zinc-700 font-semibold">
        {msg}
        <span>
          <Link
            to="/searchJobs"
            className="text-blue-500 underline font-medium text-lg"
          >
            {" "}
            Search Job Here.
          </Link>
        </span>
      </h1>
    </div>
  );
}

export default NoJobData;
