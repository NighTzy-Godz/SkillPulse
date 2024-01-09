import React from "react";

import { Button } from "flowbite-react";

import ProfileCard from "../components/common/ProfileCard";
import ProfileIntro from "../components/user/ProfileIntro";

function UserProfile() {
  return (
    <div className="sm:py-8 ">
      <div className="container mx-auto">
        <ProfileIntro />
        <ProfileCard className="mb-4">
          <h1></h1>
        </ProfileCard>
      </div>
    </div>
  );
}

export default UserProfile;
