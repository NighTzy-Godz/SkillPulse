import * as React from "react";
import { IExperience } from "../common/ProfileOrgBanner";
import moment from "moment";
import formatDate, { findDuration } from "../../utils/dateDuration";

export interface IExperienceCardProps {
  data: IExperience;
}

const renderEndDate = (endDate: string | Date) => {
  if (endDate === "Present") return "Present";
  return moment(endDate).format("MMM Do YYYY");
};

export default function ExperienceCard(props: IExperienceCardProps) {
  const { data: item } = props;

  return (
    <div className="flex gap-2">
      <div className="mb-5 w-full">
        <h3 className="text-zinc-700 font-bold text-lg">{item.position}</h3>
        <div className="flex gap-2 mb-1">
          <p className="text-zinc-600 text-sm ">{item.company}</p>
          <p className="text-zinc-600 text-sm b-dot">{item.employmentType}</p>
        </div>
        <div className="flex gap-2 flex-wrap  mb-5">
          <div className="flex gap-2">
            <p className="text-zinc-600 text-sm ">
              {moment(item.startDate).format("MMM Do YYYY")}
            </p>
            <p className="text-zinc-600 text-sm ">-</p>
            <p className="text-zinc-600 text-sm">
              {renderEndDate(item.endDate)}
            </p>
          </div>

          <p className="text-zinc-600 text-sm b-dot">
            {formatDate(findDuration(item.startDate))}
          </p>
        </div>

        <div className="">
          <p className="text-sm text-zinc-700 whitespace-pre-wrap">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
