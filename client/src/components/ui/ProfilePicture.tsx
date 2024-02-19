import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import IntroShowCard from "./IntroShowCard";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { setIsProfileClicked } from "../../store/slices/ui";

interface ProfilePictureProps {
  img: string;
  isOwner: boolean;
}

function ProfilePicture({ img, isOwner }: ProfilePictureProps) {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const { isProfileClicked } = useSelector((state: State) => state.entities.ui);
  const cardRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        dispatch(setIsProfileClicked(false));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cardRef]);

  return (
    <div className="mt-[-125px] relative pfp" ref={cardRef}>
      <div
        className="absolute  h-[130px] w-[130px] sm:h-[150px] sm:w-[150px]  hover:bg-gray-900 opacity-50 object-cover rounded-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => dispatch(setIsProfileClicked(!isProfileClicked))}
      >
        {isHovered && <FaPen className="absolute top-16 left-16 color " />}
      </div>
      <img
        src={img}
        alt=""
        className=" h-[130px] w-[130px] sm:h-[150px] sm:w-[150px] object-cover rounded-full"
      />

      {isProfileClicked && <IntroShowCard isOwner={isOwner} />}
    </div>
  );
}

export default ProfilePicture;
