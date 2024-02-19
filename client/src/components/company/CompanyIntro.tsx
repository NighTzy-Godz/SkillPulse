import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { FaEdit } from "react-icons/fa";
import NoProfileData from "../common/NoProfileData";
import ProfilePicture from "../ui/ProfilePicture";
import CoverPhoto from "../ui/CoverPhoto";
import ShowProfileCover from "../ui/ShowProfileCover";
import ShowProfilePicture from "../ui/ShowProfilePicture";
import CompanyEditIntroModal from "../modal/CompanyEditIntroModal";
function CompanyIntro() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const company = useSelector(
    (state: State) => state.entities.company.currCompany
  );
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  const { showCoverPhoto, showPfp } = useSelector(
    (state: State) => state.entities.ui
  );

  const {
    name,
    description,
    industry,
    coverPhoto,
    email,
    size,
    location,
    logo,
    owner,
  } = company || {};

  const isOwner = currUserId === owner;

  const renderDescription = () => {
    if (!description)
      return <NoProfileData msg="Company Bio has not been set yet" />;

    return <p className="text-gray-600">{description}</p>;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <React.Fragment>
      <ProfileCard className="mb-4">
        <CompanyEditIntroModal
          onModalClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
        <CoverPhoto img={coverPhoto as string} isOwner={isOwner} />
        <ShowProfileCover
          showCoverPhoto={showCoverPhoto}
          img={coverPhoto as string}
        />
        <ShowProfilePicture showPfp={showPfp} img={logo as string} />
        <div className="py-5 px-8">
          <div className="flex justify-between relative ">
            <ProfilePicture img={logo as string} isOwner={isOwner} />
            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEdit />
            </div>
          </div>

          <div className="mt-2 ">
            <h1 className="text-2xl font-bold text-gray-700">
              {name}
              <span className="text-gray-500 text-sm  ">(Company)</span>
            </h1>

            {renderDescription()}
          </div>

          <div className="mt-5">
            <p className="text-gray-500  mb-1">
              <span className="text-gray-500 font-semibold">Industry: </span>
              {industry}
            </p>
            <p className="text-gray-500  mb-1">
              {" "}
              <span className="text-gray-500 font-semibold">Email: </span>
              {email}
            </p>
            <p className="text-gray-500  mb-1">
              {" "}
              <span className="text-gray-500 font-semibold">
                Company Size:{" "}
              </span>
              {size} Employees
            </p>
            <p className="text-gray-500  mb-1">
              {" "}
              <span className="text-gray-500 font-semibold">Location: </span>
              {location}
            </p>
          </div>
        </div>
      </ProfileCard>
    </React.Fragment>
  );
}

export default CompanyIntro;
