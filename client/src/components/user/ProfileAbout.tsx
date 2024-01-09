import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";

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
    <ProfileCard className="p-5">
      <div className="mb-3">
        <h1 className="text-gray-700 text-xl font-bold">About</h1>
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
