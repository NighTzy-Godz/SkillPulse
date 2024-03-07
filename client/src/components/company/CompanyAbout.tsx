import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import NoProfileData from "../common/NoProfileData";
import CompanyEditOverviewModal from "../modal/CompanyEdiOverviewModal";

function CompanyAbout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const company = useSelector(
    (state: State) => state.entities.company.currCompany
  );

  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  const isOwner = currUserId === company?.owner;

  const renderCompanyAbout = () => {
    if (!company?.about)
      return <NoProfileData msg="No Company Overview at the moment" />;
    return (
      <p className="mb-5 text-gray-600   whitespace-pre-wrap pb-5">
        {company?.about}
      </p>
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <CompanyEditOverviewModal
        isModalOpen={isModalOpen}
        onModalClose={handleCloseModal}
      />
      <ProfileCard className="sm:py-5 sm:px-8 py-3 px-5 mb-5">
        <div className="mb-3 flex justify-between">
          <h1 className="text-gray-700 text-2xl font-bold">About</h1>
          {isOwner && (
            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEdit />
            </div>
          )}
        </div>

        {renderCompanyAbout()}
      </ProfileCard>
    </React.Fragment>
  );
}

export default CompanyAbout;
