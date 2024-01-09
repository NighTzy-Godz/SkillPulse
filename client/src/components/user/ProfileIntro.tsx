import React from "react";
import ProfileCard from "../common/ProfileCard";
import customBtnTheme from "../../utils/customBtnTheme";
import ProfileOrgBanner from "../common/ProfileOrgBanner";
import pfp from "../../assets/img/new_me.jpg";
import bg from "../../assets/img/new_BG.jpg";
import { Button } from "flowbite-react";

function ProfileIntro() {
  return (
    <ProfileCard className="mb-4 pb-5">
      <div className="h-[30dvh] min-h-[300px]">
        <img
          src={bg}
          alt=""
          className="w-full h-full  object-cover sm:rounded-t-xl"
        />
      </div>

      <div className="px-5">
        <div className="flex justify-between relative ">
          <div className="">
            <img
              src={pfp}
              alt=""
              className=" h-[130px] w-[130px] sm:h-[150px] sm:w-[150px] object-cover rounded-full  mt-[-90px]"
            />
          </div>
          <div className="w-[25%] md:w-[15%] mt-6 ">
            <Button
              theme={customBtnTheme}
              size="sm"
              color="blue"
              className="w-full"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="flex">
          <div className="flex w-2/3">
            <div className=" mt-3">
              <h1 className="text-2xl font-bold text-gray-700">
                Aser Hubero{" "}
                <span className="text-gray-500 text-sm  ">(He / Him)</span>
              </h1>
              <p className="text-gray-600">
                Aspiring Front End Developer Seeking Opportunities to Build
                Stunning User Interfaces with React | Skilled in Node.js and
                Express | Former STEM student from Asia Pacific College
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <ProfileOrgBanner />
          </div>
        </div>

        <div className="mt-2">
          {" "}
          <p className="text-gray-500 text-sm">ajhubero16@gmail.com</p>
          <p className="text-gray-500 text-sm">0998 490 7193</p>
          <p className="text-gray-500 text-sm">Nov 19 2003</p>
          <p className="text-gray-500 text-sm">Taguig City</p>
        </div>
      </div>
    </ProfileCard>
  );
}

export default ProfileIntro;
