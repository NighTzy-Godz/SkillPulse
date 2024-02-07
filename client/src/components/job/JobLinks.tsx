import React from "react";
import { IJob } from "../../interfaces/Job";
import { JobLink } from "../../data/jobLinks";
interface JobLinkProps {
  data: JobLink;
  isActive: boolean;
  categoryLength?(jobCategory: string): number;
  onJobItemClick(value: string): void;
}

function JobLinks({
  data: item,
  isActive,
  categoryLength,
  onJobItemClick,
}: JobLinkProps) {
  return (
    <li
      key={item.id}
      onClick={() => onJobItemClick(item.value)}
      className={`p-3 border-l-4 border-t flex justify-between cursor-pointer ${
        isActive ? "customBorder" : ""
      } border-zinc-300 `}
    >
      <p className={` ${isActive ? "text-blue-500" : "text-zinc-500"}`}>
        {item.name}
      </p>
      {categoryLength && (
        <p className="text-sm text-zinc-500">{categoryLength(item.value)}</p>
      )}
    </li>
  );
}

export default JobLinks;
