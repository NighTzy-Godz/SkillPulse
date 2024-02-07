import React from "react";
import { FaBookmark } from "react-icons/fa";
interface JobHeaderProps {
  title: string;
}

function JobHeader({ title }: JobHeaderProps) {
  return (
    <React.Fragment>
      <FaBookmark className="h-4 w-4 text-zinc-500" />
      <h1 className="text-zinc-500 text-lg font-semibold text-center ">
        {title}
      </h1>
    </React.Fragment>
  );
}

export default JobHeader;
