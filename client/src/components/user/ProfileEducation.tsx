import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import NoProfileData from "../common/NoProfileData";
import { useSelector } from "react-redux";
import { State } from "../../store/store";

import UserAddEducationModal from "../modal/UserAddEducationModal";
import EducationCard from "./EducationCard";
import { Link, useParams } from "react-router-dom";

function ProfileEducation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useParams();
  const education = useSelector(
    (state: State) => state.entities.user.userData?.education
  );

  const renderEducation = () => {
    if (education?.length === 0)
      return (
        <NoProfileData msg="This User did not put some Education at the moment" />
      );
    return education?.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <EducationCard data={item} />
        </React.Fragment>
      );
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <ProfileCard className="px-8 py-5 mb-4">
      <UserAddEducationModal
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
      />
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">Education</h1>

        <div className="flex gap-6">
          <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <IoMdAdd />
          </div>
          <Link
            to={`/user/profile/${userId}/education`}
            className="cursor-pointer"
          >
            <FaEdit />
          </Link>
        </div>
      </div>
      {renderEducation()}
    </ProfileCard>
  );
}

export default ProfileEducation;
