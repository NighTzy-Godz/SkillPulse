import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import NoProfileData from "../../components/common/NoProfileData";

import ExperienceCard from "../../components/user/ExperienceCard";
import { useParams } from "react-router-dom";
import { getUserData } from "../../store/slices/user";
import { FaEdit } from "react-icons/fa";
import UserAddExpModal from "../../components/modal/UserAddExpModal";
import { IExperience } from "../../components/common/ProfileOrgBanner";
import UserEditExpModal from "../../components/modal/UserEditExpModal";

function DetailsExp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<IExperience>();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const experience = useSelector(
    (state: State) => state.entities.user.userData?.experience
  );

  useEffect(() => {
    if (!experience) {
      dispatch(getUserData(userId as string));
    }
  }, [userId]);

  const renderExperience = () => {
    if (experience?.length === 0)
      return <NoProfileData msg="You dont have any experience at the moment" />;
    return experience?.map((item) => {
      return (
        <div className="flex mb-3 justify-between" key={item.company}>
          <ExperienceCard data={item} />
          <div
            className="cursor-pointer"
            onClick={() => handleUpdateModal(item)}
          >
            {" "}
            <FaEdit className="h-6 w-6 text-zinc-600" />
          </div>
        </div>
      );
    });
  };

  const handleUpdateModal = (item: IExperience) => {
    setSelectedExp(item);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="py-10">
      {selectedExp && (
        <UserEditExpModal
          data={selectedExp as IExperience}
          showModal={isUpdateModalOpen}
          onModalClose={handleUpdateModalClose}
        />
      )}
      <UserAddExpModal
        showModal={isModalOpen}
        onModalClose={handleCloseModal}
      />

      <div className="container mx-auto">
        <div className="boxShadow2 px-10 py-6">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-xl text-zinc-700 font-semibold">
              Details for experience
            </h1>
            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <IoMdAdd className="h-8 w-8 text-zinc-600" />
            </div>
          </div>

          {renderExperience()}
        </div>
      </div>
    </div>
  );
}

export default DetailsExp;
