import React from "react";
import ProfileCard from "../common/ProfileCard";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import NoProfileData from "../common/NoProfileData";

function CompanyAbout() {
  const companyAbout = useSelector(
    (state: State) => state.entities.company.currCompany?.description
  );

  const renderCompanyAbout = () => {
    if (!companyAbout)
      return <NoProfileData msg="No Company About at the moment" />;
    return (
      <p className="mb-5 text-gray-600 text-sm whitespace-pre-wrap pb-5">
        {companyAbout}
      </p>
    );
  };

  return (
    <React.Fragment>
      <ProfileCard className="py-5 px-8 mb-5">
        <div className="mb-3 flex justify-between">
          <h1 className="text-gray-700 text-2xl font-bold">About</h1>
          <div className="cursor-pointer">
            <FaEdit />
          </div>
        </div>

        {renderCompanyAbout()}
      </ProfileCard>
    </React.Fragment>
  );
}

export default CompanyAbout;
