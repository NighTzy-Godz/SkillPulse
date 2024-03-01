import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setShowCoverPhoto, setShowPfp } from "../../store/slices/ui";
import { ImCancelCircle } from "react-icons/im";
interface ShowProfileCoverProps {
  showCoverPhoto: boolean;
  img: string;
}

function ShowProfileCover({ showCoverPhoto, img }: ShowProfileCoverProps) {
  const dispatch = useDispatch();
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (imgRef.current && !imgRef.current.contains(e.currentTarget as Node)) {
        document.body.style.overflow = "auto";
        dispatch(setShowCoverPhoto(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imgRef]);

  const handleShowProfileCover = () => {
    dispatch(setShowCoverPhoto(false));
    document.body.style.overflow = "auto";
  };

  if (showCoverPhoto) {
    return (
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75 z-50">
        <div
          className="absolute top-6 left-6 cursor-pointer"
          onClick={handleShowProfileCover}
        >
          <ImCancelCircle />
        </div>

        <div ref={imgRef}>
          {" "}
          <img
            src={img}
            alt="Profile Picture"
            className="max-w-screen-md max-h-screen mx-auto"
          />
        </div>
      </div>
    );
  }
  return null;
}

export default ShowProfileCover;
