import ProfileCard from "../common/ProfileCard";

import ProfileOrgBanner from "../common/ProfileOrgBanner";

import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import UserEditIntroModal from "../modal/UserEditIntroModal";
import moment from "moment";
import { FaPen } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { setUserStatusCode, updateUserPfp } from "../../store/slices/user";
import ProfileIntroShowCard from "./ProfileIntroShowCard";

function ProfileIntro() {
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state: State) => state.entities.user.statusCode
  );

  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsProfileClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cardRef]);

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

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setUserStatusCode(null));
      setIsProfileClicked(false);
    }
  }, [statusCode]);

  return (
    <React.Fragment>
      <ProfileCard className="mb-4">
        <div className="h-[30dvh] min-h-[300px] ">
          <img
            src={coverPhoto}
            alt=""
            className="w-full h-full  object-cover sm:rounded-t-xl"
          />
        </div>

        <div className="py-5 px-8">
          <div className="flex justify-between relative ">
            <div className="mt-[-125px] relative " ref={cardRef}>
              <div
                className="absolute  h-[130px] w-[130px] sm:h-[150px] sm:w-[150px]  hover:bg-gray-900 opacity-50 object-cover rounded-full cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsProfileClicked(!isProfileClicked)}
              >
                {isHovered && (
                  <FaPen className="absolute top-16 left-16 color text-neutral-50" />
                )}
              </div>
              <img
                src={pfp}
                alt=""
                className=" h-[130px] w-[130px] hover:bg-red-500 sm:h-[150px] sm:w-[150px] object-cover rounded-full  "
              />

              {isProfileClicked && <ProfileIntroShowCard isOwner={isOwner} />}
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
