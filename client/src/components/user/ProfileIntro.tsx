import ProfileCard from "../common/ProfileCard";

import ProfileOrgBanner from "../common/ProfileOrgBanner";

import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import React, { useEffect, useState } from "react";
import UserEditIntroModal from "../modal/UserEditIntroModal";
import moment from "moment";

import ProfilePicture from "../ui/ProfilePicture";
import { setUserStatusCode } from "../../store/slices/user";
import ShowProfilePicture from "../ui/ShowProfilePicture";
import CoverPhoto from "../ui/CoverPhoto";
import ShowProfileCover from "../ui/ShowProfileCover";

function ProfileIntro() {
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state: State) => state.entities.user.statusCode
  );
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const { showPfp, showCoverPhoto } = useSelector(
    (state: State) => state.entities.ui
  );

  const [showModal, setShowModal] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const user = useSelector((state: State) => state.entities.user.userData);
  const {
    pfp,
    _id,
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

  const isOwner = currUserId === _id;
  const contactDetails = [email, contact, location];

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setUserStatusCode(null));
      setIsProfileClicked(false);
    }
  }, [statusCode]);

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
      <ProfileCard className="mb-4 relative">
        <ShowProfilePicture showPfp={showPfp} img={pfp as string} />
        <ShowProfileCover
          showCoverPhoto={showCoverPhoto}
          img={coverPhoto as string}
        />
        <CoverPhoto img={coverPhoto as string} isOwner={isOwner} />

        <div className="py-5 px-8">
          <div className="flex justify-between relative">
            <ProfilePicture img={pfp as string} isOwner={isOwner} />
            <div className="cursor-pointer" onClick={() => setShowModal(true)}>
              <FaEdit />
            </div>
          </div>

          <div className="flex">
            <div className="flex w-2/3">
              <div className=" ">
                <h1 className="text-2xl font-bold text-gray-700 mt-3">
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

          <div className="mt-2 flex gap-2">
            {renderContactDetails}
            <p className="text-gray-500 text-sm b-dot">
              {moment(dateOfBirth).format("MMM Do YYYY")}
            </p>
          </div>
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
