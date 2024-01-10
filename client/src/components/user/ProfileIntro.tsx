import ProfileCard from "../common/ProfileCard";

import ProfileOrgBanner from "../common/ProfileOrgBanner";

import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import React, { useState } from "react";
import UserEditIntroModal from "../modal/UserEditIntroModal";

function ProfileIntro() {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state: State) => state.entities.user.userData);
  const {
    pfp,

    coverPhoto,
    firstName,
    lastName,
    gender,
    bio,
    email,
    location,
    contact,
    dateOfBirth,
    company,
  } = user || {};

  const contactDetails = [email, contact, location];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderPronouns = () => {
    if (gender === "Male") return "(He / Him)";
    return "(She / Her)";
  };

  const renderBio = () => {
    if (!bio) return "This User did not provide their bio at the moment.";
    return bio;
  };

  const renderContactDetails = contactDetails.map((item) => {
    if (item)
      return (
        <p key={item} className="text-gray-500 text-sm b-dot">
          {item}
        </p>
      );
  });

  return (
    <React.Fragment>
      <ProfileCard className="mb-4 ">
        <div className="h-[30dvh] min-h-[300px]">
          <img
            src={coverPhoto}
            alt=""
            className="w-full h-full  object-cover sm:rounded-t-xl"
          />
        </div>

        <div className="py-5 px-8">
          <div className="flex justify-between relative ">
            <div className="mt-[-125px]">
              <img
                src={pfp}
                alt=""
                className=" h-[130px] w-[130px] sm:h-[150px] sm:w-[150px] object-cover rounded-full  "
              />
            </div>
            <div className="cursor-pointer" onClick={() => setShowModal(true)}>
              <FaEdit />
            </div>
          </div>

          <div className="flex">
            <div className="flex w-2/3">
              <div className=" ">
                <h1 className="text-2xl font-bold text-gray-700">
                  {firstName} {lastName}
                  <span className="text-gray-500 text-sm  ">
                    {renderPronouns()}
                  </span>
                </h1>
                <p className="text-gray-600">{renderBio()}</p>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/3">
              {company && <ProfileOrgBanner />}
            </div>
          </div>

          <div className="mt-2 flex gap-2">{renderContactDetails}</div>
        </div>
      </ProfileCard>
      <UserEditIntroModal
        showModal={showModal}
        onModalClose={handleCloseModal}
      />
    </React.Fragment>
  );
}

export default ProfileIntro;
