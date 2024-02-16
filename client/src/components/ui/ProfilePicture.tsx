import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import IntroShowCard from "./IntroShowCard";

interface ProfilePicture {
  isProfileClicked: boolean;
  img: string;
  isOwner: boolean;
  onProfileClick(state: boolean): void;
}

function ProfilePicture({
  isProfileClicked,
  img,
  isOwner,
  onProfileClick,
}: ProfilePicture) {
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onProfileClick(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cardRef]);

  return (
    <div className="mt-[-125px] relative " ref={cardRef}>
      <div
        className="absolute  h-[130px] w-[130px] sm:h-[150px] sm:w-[150px]  hover:bg-gray-900 opacity-50 object-cover rounded-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onProfileClick(!isProfileClicked)}
      >
        {isHovered && (
          <FaPen className="absolute top-16 left-16 color text-neutral-50" />
        )}
      </div>
      <img
        src={img}
        alt=""
        className=" h-[130px] w-[130px] hover:bg-red-500 sm:h-[150px] sm:w-[150px] object-cover rounded-full"
      />

      {isProfileClicked && <IntroShowCard isOwner={isOwner} />}
    </div>
  );
}

export default ProfilePicture;
