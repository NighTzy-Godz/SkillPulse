import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../store/store";
import { EmploymentType } from "../../interfaces/User";

export interface IExperience {
  _id: string;
  employmentType: EmploymentType;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | string;
  desc: string;
}

function ProfileOrgBanner() {
  const [currJob, setCurrJob] = useState<IExperience>();

  const userExp = useSelector(
    (state: State) => state.entities.user.userData?.experience
  );

  useEffect(() => {
    const findCurrentJob = (job: IExperience[]) => {
      const currJobIndex = job.findIndex((item) => item.endDate === "Present");
      if (currJobIndex) setCurrJob(job[currJobIndex]);
      else setCurrJob(job[0]);
    };
    findCurrentJob(userExp as IExperience[]);
  }, []);

  const renderContent = () => {
    if (!currJob) return null;
    return (
      <div className="flex items-center">
        <div className="w-10 h-10">
          <img
            src="https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
            alt=""
          />
        </div>
        <div className="ml-1 ">
          <Link
            to="#"
            className="text-sm text-zinc-700 hover:text-blue-400 hover:underline"
          >
            {currJob.company}
          </Link>
          <p
            className="text-xs text-zinc-600 font-bold"
            style={{ lineHeight: ".6" }}
          >
            {currJob.position}
          </p>
        </div>
      </div>
    );
  };

  return renderContent();
}

export default ProfileOrgBanner;
