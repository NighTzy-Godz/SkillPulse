import React from "react";
import ProfileCard from "../common/ProfileCard";
import NoProfileData from "../common/NoProfileData";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function ProfileLicences() {
  const education: [] | null = [];

  const renderLicenses = () => {
    if (!education) return <NoProfileData />;
    return (
      <React.Fragment>
        <div className="mb-5">
          <h3 className="text-zinc-700 font-bold">The Ultimate Git Course</h3>
          <p className="text-zinc-500 text-sm">Code with Mosh</p>
          <p className="text-zinc-400 text-sm">Issued on March 2023</p>
        </div>{" "}
        <div className="mb-5">
          <h3 className="text-zinc-700 font-bold">The Ultimate Git Course</h3>
          <p className="text-zinc-500 text-sm">Code with Mosh</p>
          <p className="text-zinc-400 text-sm">Issued on March 2023</p>
        </div>{" "}
        <div className="mb-5">
          <h3 className="text-zinc-700 font-bold">The Ultimate Git Course</h3>
          <p className="text-zinc-500 text-sm">Code with Mosh</p>
          <p className="text-zinc-400 text-sm">Issued on March 2023</p>
        </div>
      </React.Fragment>
    );
  };

  return (
    <ProfileCard className="px-8 py-5 mb-4">
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">Certifications</h1>

        <div className="flex gap-6">
          <div className="cursor-pointer">
            <IoMdAdd />
          </div>
          <div className="cursor-pointer">
            <FaEdit />
          </div>
        </div>
      </div>
      {renderLicenses()}
    </ProfileCard>
  );
}

export default ProfileLicences;
