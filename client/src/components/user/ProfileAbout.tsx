import React, { useEffect, useState } from "react";
import ProfileCard from "../common/ProfileCard";

import { FaEdit } from "react-icons/fa";
import NoProfileData from "../common/NoProfileData";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import UserEditAboutModal from "../modal/UserEditAboutModal";

function ProfileAbout() {
  const about = useSelector(
    (state: State) => state.entities.user.userData?.about
  );

  const userId = useSelector(
    (state: State) => state.entities.user.userData?._id
  );

  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  const isOwner = currUserId === userId;

  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [slicedData, setSlicedData] = useState("");

  useEffect(() => {
    if (about && clicked) setSlicedData(about as string);
    else setSlicedData(`${about?.slice(0, 150)} ...`);
  }, [about, clicked]);

  const renderAbout = () => {
    if (!about)
      return (
        <NoProfileData msg="This User did not put some introduction at the moment" />
      );

    return (
      <React.Fragment>
        <p className="mb-5 text-gray-600 whitespace-pre-wrap pb-5">
          {slicedData}
        </p>
      </React.Fragment>
    );
  };

  const renderParagraph = () => {
    if ((about?.length as number) < 150) return;
    if (about && clicked) return "... see less";
    else if (about && !clicked) return "... see more";
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <React.Fragment>
      <UserEditAboutModal
        showModal={showModal}
        onModalClose={handleCloseModal}
      />
      <ProfileCard className="py-5 px-8 mb-5">
        <div className="mb-3 flex justify-between">
          <h1 className="text-gray-700 text-xl font-bold">About</h1>
          {isOwner && (
            <div className="cursor-pointer" onClick={() => setShowModal(true)}>
              <FaEdit />
            </div>
          )}
        </div>

        {renderAbout()}

        <div className="relative">
          <p
            className="absolute text-sm text-gray-500 right-0 bottom-0 cursor-pointer hover:underline "
            onClick={() => setClicked(!clicked)}
          >
            {renderParagraph()}
          </p>
        </div>
      </ProfileCard>
    </React.Fragment>
  );
}

export default ProfileAbout;
