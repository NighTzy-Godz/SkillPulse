import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";
import NoProfileData from "../common/NoProfileData";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import moment from "moment";
import UserAddExpModal from "../modal/UserAddExpModal";
function ProfileExperience() {
  const [showModal, setShowModal] = useState(false);

  const experience = useSelector(
    (state: State) => state.entities.user.userData?.experience
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderEndDate = (endDate: string | Date) => {
    if (endDate === "Present") return "Present";
    return moment(endDate).format("MMM Do");
  };

  const findDuration = (startDate: Date) => {
    const start = startDate;
    const currDate = moment();
    const duration = moment.duration(currDate.diff(start));

    return duration;
  };

  const formatDuration = (startDate: moment.Duration) => {
    const yrs = startDate.years();
    const months = startDate.months();

    if (yrs) return `${yrs} years and ${months} mos`;
    if (months <= 1) return "Just a month ago";
    return `${months} mos`;
  };

  const renderExperience = () => {
    if (experience?.length === 0)
      return (
        <NoProfileData msg="This User did not put some Experiences at the moment " />
      );

    return experience?.map((item) => {
      console.log(moment.duration(moment().diff(item.startDate)));
      return (
        <React.Fragment>
          <div className="flex gap-2">
            <div className="mb-5 w-full">
              <h3 className="text-zinc-700 font-bold text-lg">
                {item.position}
              </h3>
              <div className="flex gap-2 mb-1">
                <p className="text-zinc-600 text-sm ">{item.company}</p>
                <p className="text-zinc-600 text-sm b-dot">
                  {item.employmentType}
                </p>
              </div>
              <div className="flex gap-2 mb-5">
                <p className="text-zinc-600 text-sm ">
                  {moment(item.startDate).format("MMM Do YYYY")}
                </p>
                <p className="text-zinc-600 text-sm ">-</p>
                <p className="text-zinc-600 text-sm">
                  {renderEndDate(item.endDate)}
                </p>
                <p className="text-zinc-600 text-sm b-dot">
                  {formatDuration(findDuration(item.startDate))}
                </p>
              </div>

              <div className="">
                <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
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
            <div className="cursor-pointer">
              <FaEdit />
            </div>
          )}
        </div>
      </div>
      {renderExperience()}
    </ProfileCard>
  );
}

export default ProfileExperience;
