import React from "react";
import { Link } from "react-router-dom";

interface NoJobDataProps {
  msg: string;
  addLink?: boolean;
}

function NoJobData({ msg, addLink = true }: NoJobDataProps) {
  return (
    <div className="text-center ">
      <h1 className="text-xl text-zinc-600 font-semibold">
        {msg}
        {"   "}
        {addLink && (
          <span>
            <Link to="/searchJobs" className="text-blue-500 underline  text-lg">
              Search Job Here.
            </Link>
          </span>
        )}
      </h1>
    </div>
  );
}

export default NoJobData;
