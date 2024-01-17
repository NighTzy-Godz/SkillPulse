import React from "react";
import ProfileCard from "../common/ProfileCard";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { FaEdit } from "react-icons/fa";
import NoProfileData from "../common/NoProfileData";
function CompanyIntro() {
  const company = useSelector(
    (state: State) => state.entities.company.currCompany
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
  } = company || {};

  const renderDescription = () => {
    if (!description)
      return <NoProfileData msg="Company Bio has not been set yet" />;

    return description;
  };
  return (
    <React.Fragment>
      <ProfileCard className="mb-4">
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
                src={logo}
                alt=""
                className=" h-[130px] w-[130px] sm:h-[150px] sm:w-[150px] object-cover rounded-full  "
              />
            </div>
            <div className="cursor-pointer">
              <FaEdit />
            </div>
          </div>

          <div className="mt-2 ">
            <h1 className="text-2xl font-bold text-gray-700">
              {name}
              <span className="text-gray-500 text-sm  ">(Company)</span>
            </h1>

            <p className="text-gray-600">{renderDescription()}</p>
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
