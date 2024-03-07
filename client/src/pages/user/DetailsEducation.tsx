import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import NoProfileData from "../../components/common/NoProfileData";
import EducationCard from "../../components/user/EducationCard";
import { IoMdAdd } from "react-icons/io";

import { FaEdit } from "react-icons/fa";
import UserAddEducationModal from "../../components/modal/UserAddEducationModal";
import EditEducationModal from "../../components/modal/UserEditEducationModal";
import { useParams } from "react-router-dom";
import { getUserData } from "../../store/slices/user";
import { IEducation } from "../../interfaces/User";

function DetailsEducation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<IEducation>();
  const { userId } = useParams();
  const dispatch = useDispatch();

  const education = useSelector(
    (state: State) => state.entities.user.userData?.education
  );

  useEffect(() => {
    if (!education) {
      dispatch(getUserData(userId as string));
    }
  }, [userId]);

  const renderEducation = () => {
    if (education?.length === 0)
      return <NoProfileData msg="You dont have any education at the moment" />;
    return education?.map((item, index) => {
      return (
        <div className="flex mb-3  justify-between" key={index}>
          <EducationCard data={item} />
          <div
            className="cursor-pointer mt-1"
            onClick={() => handleUpdateModal(item)}
          >
            <FaEdit className="h-6 w-6 text-zinc-600" />
          </div>
        </div>
      );
    });
  };

  const handleUpdateModal = (item: IEducation) => {
    setSelectedEducation(item);
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="py-10">
      {selectedEducation && (
        <EditEducationModal
          data={selectedEducation}
          isModalOpen={isUpdateModalOpen}
          onModalClose={handleUpdateModalClose}
        />
      )}

      <UserAddEducationModal
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
      />
      <div className="container mx-auto">
        <div className="boxShadow2 md:px-10 md:py-6 sm:px-8 sm:py-4 px-6 py-3">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-xl text-zinc-700 font-semibold">
              Details for education
            </h1>
            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <IoMdAdd className="h-8 w-8 text-zinc-600" />
            </div>
          </div>

          {renderEducation()}
        </div>
      </div>
    </div>
  );
}

export default DetailsEducation;
