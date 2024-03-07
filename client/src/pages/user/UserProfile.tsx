import ProfileIntro from "../../components/user/ProfileIntro";
import ProfileAbout from "../../components/user/ProfileAbout";
import ProfileEducation from "../../components/user/ProfileEducation";
import ProfileLicences from "../../components/user/ProfileLicences";
import ProfileExperience from "../../components/user/ProfileExperience";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../../store/slices/user";

import { UserType, setUserType } from "../../store/slices/ui";
import { State } from "../../store/store";
import { RotatingLines } from "react-loader-spinner";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state: State) => state.entities.user.loading);
  useEffect(() => {
    dispatch(getUserData(userId as string));
    dispatch(setUserType(UserType.USER));
  }, [userId]);

  if (loading) {
    return (
      <div className="w-full h-[92dvh] grid place-content-center">
        <RotatingLines
          visible={true}
          animationDuration=".75"
          strokeColor="#3f83f8"
          strokeWidth="5"
        />
      </div>
    );
  }

  return (
    <div className="sm:py-8 profile">
      <div className="sm:container mx-auto">
        <ProfileIntro />
        <ProfileAbout />
        <ProfileExperience />
        <ProfileEducation />
      </div>
    </div>
  );
}

export default UserProfile;
