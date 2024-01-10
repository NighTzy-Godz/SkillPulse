import React, { useEffect, useState } from "react";
import ProfileCard from "../common/ProfileCard";

import { FaEdit } from "react-icons/fa";
import NoProfileData from "../common/NoProfileData";
import { useSelector } from "react-redux";
import { State } from "../../store/store";

function ProfileAbout() {
  const user = useSelector((state: State) => state.entities.user.userData);

  const [clicked, setClicked] = useState(false);
  const [slicedData, setSlicedData] = useState("");
  useEffect(() => {
    if (user && !clicked) {
      setSlicedData(user.about.slice(0, 80));
    } else {
      setSlicedData(user?.about as string);
    }
  }, []);

  const renderAbout = () => {
    if (!user?.about)
      return (
        <NoProfileData msg="This User did not put some introduction at the moment" />
      );

    return (
      <React.Fragment>
        <p className="mb-5 text-gray-600 text-sm whitespace-pre-wrap">
          {slicedData}
        </p>
      </React.Fragment>
    );
  };
  const renderParagraph = () => {
    if (user?.about && clicked) return "... see less";
    else if (user?.about && !clicked) "... see more";
  };
  return (
    <ProfileCard className="py-5 px-8 mb-5">
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
          {renderParagraph()}
        </p>
      </div>
    </ProfileCard>
  );
}

export default ProfileAbout;
