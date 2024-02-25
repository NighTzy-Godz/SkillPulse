import * as React from "react";
import formatDate, { findDuration } from "../../utils/dateDuration";
import { IEducation } from "../../interfaces/User";

export interface IEducationCardProps {
  data: IEducation;
}

export default function EducationCard(props: IEducationCardProps) {
  const { data: item } = props;
  return (
    <div className="mb-8">
      <h3 className="text-zinc-700 font-bold text-lg">{item.schoolName}</h3>
      <p className="text-zinc-500 text-sm">{item.degree}</p>
      <p className="text-zinc-400 text-sm">
        Graduated {formatDate(findDuration(item.graduateYear))}
      </p>
    </div>
  );
}
