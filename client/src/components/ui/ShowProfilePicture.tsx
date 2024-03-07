import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setShowPfp } from "../../store/slices/ui";
import { ImCancelCircle } from "react-icons/im";
interface ShowProfilePictureProps {
  showPfp: boolean;
  img: string;
}

function ShowProfilePicture({ showPfp, img }: ShowProfilePictureProps) {
  const dispatch = useDispatch();
  const pfpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pfpRef.current && !pfpRef.current.contains(e.currentTarget as Node)) {
        document.body.style.overflow = " auto";
        dispatch(setShowPfp(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pfpRef]);

  const handleShowPfp = () => {
    dispatch(setShowPfp(false));
    document.body.style.overflow = " auto";
  };

  if (showPfp) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 z-50">
        <div
          className="absolute top-6 left-6 cursor-pointer"
          onClick={handleShowPfp}
        >
          <ImCancelCircle />
        </div>

        <div className="bg-red-500" ref={pfpRef}>
          {" "}
          <img
            src={img}
            alt="Profile Picture"
            className="max-w-screen max-h-screen mx-auto"
          />
        </div>
      </div>
    );
  }
  return null;
}

export default ShowProfilePicture;
