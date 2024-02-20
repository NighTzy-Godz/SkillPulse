import React from "react";

interface NoProfileDataProps {
  msg: string;
}

function NoProfileData({ msg }: NoProfileDataProps) {
  return (
    <React.Fragment>
      <p className="text-gray-600 ">{msg}</p>
    </React.Fragment>
  );
}

export default NoProfileData;
