import React from "react";
import ProfileCard from "../common/ProfileCard";
import NoProfileData from "../common/NoProfileData";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function ProfileExperience() {
  const experience: [] | null = [];

  const renderExperience = () => {
    if (!experience) return <NoProfileData />;
    return (
      <React.Fragment>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-red-500 w-8">
            <img
              src="https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
              className="w-full h-full"
            />
          </div>
          <div className="mb-5 w-full">
            <h3 className="text-zinc-700 font-bold text-lg">
              Full Stack Developer
            </h3>
            <div className="flex gap-2 mb-1">
              <p className="text-zinc-600 text-sm ">XAM Consulting</p>
              <p className="text-zinc-600 text-sm b-dot">Part Time</p>
            </div>
            <div className="flex gap-2 mb-5">
              <p className="text-zinc-600 text-sm ">Aug 22 2021</p>
              <p className="text-zinc-600 text-sm ">-</p>
              <p className="text-zinc-600 text-sm">Jun 14 2022</p>
              <p className="text-zinc-600 text-sm b-dot">6 Months</p>
            </div>

            <div className="">
              <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                1. Set up connections with all kinds of talents via different
                recruitment channel such as LinkedIn, Indeed and so on. 2.
                Maintain and manage talent database, expand and manage job
                portals. 3. Sourcing according to client’s demands, telephone
                screening with candidates to assess the qualification of
                profiles. 4. Work closely with recruitment team members to
                search qualified candidates for requisition matching from the
                database. 5. Can work independently and Work with internal
                functions to arrange interview and update progress to internal
                HM.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <ProfileCard className="px-8 py-5 mb-4">
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">Experience</h1>

        <div className="flex gap-6">
          <div className="cursor-pointer">
            <IoMdAdd />
          </div>
          <div className="cursor-pointer">
            <FaEdit />
          </div>
        </div>
      </div>
      {renderExperience()}
    </ProfileCard>
  );
}

export default ProfileExperience;
