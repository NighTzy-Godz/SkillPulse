import React, { ChangeEvent, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPfp } from "../../store/slices/user";
import {
  UserType,
  setIsProfileClicked,
  setShowPfp,
} from "../../store/slices/ui";
import { State } from "../../store/store";
import { updateCompanyLogo } from "../../store/slices/company";

interface IntroShowCard {
  isOwner: boolean;
}

function IntroShowCard({ isOwner }: IntroShowCard) {
  const dispatch = useDispatch();
  const userType = useSelector((state: State) => state.entities.ui.userType);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      console.log(userType);
      const formData = new FormData();
      formData.append("pfp", file);
      if (userType === UserType.USER) dispatch(updateUserPfp(formData as any));
      else dispatch(updateCompanyLogo(formData as any));

      dispatch(setIsProfileClicked(false));
    }
  };

  const handleProfileClick = () => {
    dispatch(setShowPfp(true));
    document.body.style.overflow = "hidden";
  };

  const text = userType === "user" ? "Profile Picture" : "Company Logo";

  return (
    <div className="absolute w-80 boxShadow2 bg-gray-200 left-[-55px] mt-3  rounded-md">
      <div className="flex items-center py-3 gap-2 cursor-pointer hover:bg-gray-300 px-2">
        <FaRegUser />
        <p className="text-slate-600 " onClick={handleProfileClick}>
          See {text}
        </p>
      </div>

      {isOwner && (
        <form>
          <label
            htmlFor="profilePictureInput"
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 py-3 px-2"
          >
            <AiOutlinePicture />
            <p className="text-slate-600 ">Choose {text}</p>
          </label>
          <input
            type="file"
            id="profilePictureInput"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </form>
      )}
    </div>
  );
}

export default IntroShowCard;
