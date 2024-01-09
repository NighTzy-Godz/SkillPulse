import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";

import { FaEdit } from "react-icons/fa";

interface ProfileAboutProps {
  data: string;
}

function ProfileAbout({ data }: ProfileAboutProps) {
  const [clicked, setClicked] = useState(false);

  const slicedData = !clicked ? `${data.slice(0, 80)} ...` : data;

  const renderAbout = () => {
    if (!data)
      return (
        <p className="text-gray-600 text-lg">
          No profile data with this category was found.
        </p>
      );

    return (
      <React.Fragment>
        <p className="mb-5 text-gray-600 text-sm whitespace-pre-wrap">
          {slicedData}
        </p>
      </React.Fragment>
    );
  };

  return (
    <ProfileCard className="py-5 px-8">
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">About</h1>
        <div className="cursor-pointer">
          <FaEdit />
        </div>
      </div>

      {renderAbout()}

      <div className="relative">
        <p
          className="absolute text-sm text-gray-500 right-0 bottom-0 cursor-pointer hover:underline"
          onClick={() => setClicked(!clicked)}
        >
          {clicked ? "... see less" : "... see more"}
        </p>
      </div>
    </ProfileCard>
  );
}

export default ProfileAbout;
