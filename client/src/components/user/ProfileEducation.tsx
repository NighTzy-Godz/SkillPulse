import React from "react";
import ProfileCard from "../common/ProfileCard";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import NoProfileData from "../common/NoProfileData";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import moment from "moment";
function ProfileEducation() {
  const education = useSelector(
    (state: State) => state.entities.user.userData?.education
  );

  const renderEducation = () => {
    if (education?.length === 0)
      return (
        <NoProfileData msg="This User did not put some Education at the moment" />
      );
    return education?.map((item) => {
      return (
        <React.Fragment>
          <div className="mb-5">
            <h3 className="text-zinc-700 font-bold">{item.schoolName}</h3>
            <p className="text-zinc-500 text-sm">{item.degree}</p>
            <p className="text-zinc-400 text-sm">
              {moment(item.graduateYear).format("MMM Do")}
            </p>
          </div>{" "}
        </React.Fragment>
      );
    });
  };

  return (
    <ProfileCard className="px-8 py-5 mb-4">
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
