import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setShowCoverPhoto } from "../../store/slices/ui";

interface CoverPhotoProps {
  img: string;
  isOwner: boolean;
}

function CoverPhoto({ img, isOwner }: CoverPhotoProps) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleShowCoverPhoto = () => {
    dispatch(setShowCoverPhoto(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 rounded-t-xl  cursor-pointer bg-gray-900 bg-opacity-50 ${
          isHovered ? "opacity-70" : "opacity-0"
        } transition-opacity`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleShowCoverPhoto}
      >
        {isHovered && <FaPen className=" absolute right-6 top-6" />}
      </div>

      <img src={img} alt="" className="w-full object-cover rounded-t-xl" />
    </div>
  );
}

export default CoverPhoto;
