import React, { ChangeEvent, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UserType, setShowCoverPhoto } from "../../store/slices/ui";
import {
  setUserStatusCode,
  updateUserCoverPhoto,
} from "../../store/slices/user";
import { State } from "../../store/store";
import { updateCompanyCoverPhoto } from "../../store/slices/company";

interface CoverPhotoProps {
  img: string;
  isOwner: boolean;
}

function CoverPhoto({ img, isOwner }: CoverPhotoProps) {
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state: State) => state.entities.user.statusCode
  );
  const userType = useSelector((state: State) => state.entities.ui.userType);

  const [isHovered, setIsHovered] = useState(false);

  const handleShowCoverPhoto = () => {
    dispatch(setShowCoverPhoto(true));
    document.body.style.overflow = "hidden";
  };

  const handleEditCoverPhoto = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (statusCode === 200 && userType === UserType.USER) {
      setUserStatusCode(null);
    }
  }, [statusCode]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("coverPhoto", file);
      if (userType === UserType.USER) {
        dispatch(updateUserCoverPhoto(formData as any));
      } else dispatch(updateCompanyCoverPhoto(formData as any));
    }
  };
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 rounded-t-xl  cursor-pointer bg-gray-500 bg-opacity-50 ${
          isHovered ? "opacity-70" : "opacity-0"
        } transition-opacity`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleShowCoverPhoto}
      >
        {isHovered && isOwner && (
          <div
            className="absolute right-6 top-6 "
            onClick={handleEditCoverPhoto}
          >
            <label htmlFor="changeCoverPhoto" className="cursor-pointer">
              <FaPen />
            </label>
            <input
              type="file"
              id="changeCoverPhoto"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      <img
        src={img}
        alt=""
        className="w-full h-[35dvh] min-h-[300px] max-h-[350px] object-cover rounded-t-xl"
      />
    </div>
  );
}

export default CoverPhoto;
