import React, { ChangeEvent } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateUserPfp } from "../../store/slices/user";

interface ProfileIntroShowCard {
  isOwner: boolean;
}

function ProfileIntroShowCard({ isOwner }: ProfileIntroShowCard) {
  const dispatch = useDispatch();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("pfp", file);
      dispatch(updateUserPfp(formData as any));
    }
  };

  return (
    <div className="absolute w-80 boxShadow2 bg-gray-200 left-[-55px] mt-3  rounded-md">
      <div className="flex items-center py-3 gap-2 cursor-pointer hover:bg-gray-300 px-2">
        <FaRegUser />
        <p className="text-slate-600 ">See Profile Picture</p>
      </div>

      {isOwner && (
        <form>
          <label
            htmlFor="profilePictureInput"
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 py-3 px-2"
          >
            <AiOutlinePicture />
            <p className="text-slate-600 ">Choose Profile Picture</p>
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

export default ProfileIntroShowCard;
