import * as React from "react";
import formatDate, { findDuration } from "../../utils/dateDuration";

export interface IEducation {
  _id: string;
  schoolName: string;
  graduateYear: Date;
  degree: string;
}

export interface IEducationCardProps {
  data: IEducation;
}

export default function EducationCard(props: IEducationCardProps) {
  const { data: item } = props;
  return (
    <div className="mb-5">
      <h3 className="text-zinc-700 font-bold">{item.schoolName}</h3>
      <p className="text-zinc-500 text-sm">{item.degree}</p>
      <p className="text-zinc-400 text-sm">
        Graduated {formatDate(findDuration(item.graduateYear))}
      </p>
    </div>
  );
}
