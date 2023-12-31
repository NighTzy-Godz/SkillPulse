import ProfileIntro from "../components/user/ProfileIntro";
import ProfileAbout from "../components/user/ProfileAbout";
import ProfileEducation from "../components/user/ProfileEducation";
import ProfileLicences from "../components/user/ProfileLicences";
import ProfileExperience from "../components/user/ProfileExperience";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../store/slices/user";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData(userId as string));
  }, []);

  return (
    <div className="sm:py-8 profile">
      <div className="container mx-auto">
        <ProfileIntro />
        <ProfileAbout />
        <ProfileExperience />
        <ProfileEducation />
        <ProfileLicences />
      </div>
    </div>
  );
}

export default UserProfile;
