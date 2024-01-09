import React from "react";
import ProfileCard from "../common/ProfileCard";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import NoProfileData from "../common/NoProfileData";
function ProfileEducation() {
  const education: [] | null = [];

  const renderEducation = () => {
    if (!education) return <NoProfileData />;
    return (
      <div className="mb-5">
        <h3 className="text-zinc-700 font-bold">Asia Pacific College</h3>
        <p className="text-zinc-500 text-sm">Senior Highschool (STEM)</p>
        <p className="text-zinc-400 text-sm">June 2022</p>
      </div>
    );
  };

  return (
    <ProfileCard className="px-8 py-5">
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">Education</h1>

        <div className="flex gap-6">
          <div className="cursor-pointer">
            <IoMdAdd />
          </div>
          <div className="cursor-pointer">
            <FaEdit />
          </div>
        </div>
      </div>
      {renderEducation()}
    </ProfileCard>
  );
}

export default ProfileEducation;
