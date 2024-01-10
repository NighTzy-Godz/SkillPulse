import React from "react";

interface NoProfileDataProps {
  msg: string;
}

function NoProfileData({ msg }: NoProfileDataProps) {
  return (
    <React.Fragment>
      <p className="text-gray-600 text-lg">{msg}</p>
    </React.Fragment>
  );
}

export default NoProfileData;
