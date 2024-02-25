import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";
import NoProfileData from "../common/NoProfileData";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import moment from "moment";
import UserAddExpModal from "../modal/UserAddExpModal";
import { Link } from "react-router-dom";
import formatDate, { findDuration } from "../../utils/dateDuration";
import ExperienceCard from "./ExperienceCard";
function ProfileExperience() {
  const [showModal, setShowModal] = useState(false);

  const experience = useSelector(
    (state: State) => state.entities.user.userData?.experience
  );
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderExperience = () => {
    if (experience?.length === 0)
      return (
        <NoProfileData msg="This User did not put some Experiences at the moment " />
      );

    return experience?.map((item) => {
      return (
        <React.Fragment key={item.company}>
          <ExperienceCard data={item} />
        </React.Fragment>
      );
    });
  };

  return (
    <ProfileCard className="px-8 py-5 mb-4">
      <UserAddExpModal showModal={showModal} onModalClose={handleCloseModal} />
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">Experience</h1>

        <div className="flex gap-6">
          <div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <IoMdAdd />
          </div>
          {experience?.length !== 0 && (
            <Link
              className="cursor-pointer"
              to={`/user/profile/${currUserId}/experience`}
            >
              {" "}
              <FaEdit />
            </Link>
          )}
        </div>
      </div>
      {renderExperience()}
    </ProfileCard>
  );
}

export default ProfileExperience;
