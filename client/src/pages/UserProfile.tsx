import React from "react";

import { Button } from "flowbite-react";

import ProfileCard from "../components/common/ProfileCard";
import ProfileIntro from "../components/user/ProfileIntro";
import ProfileAbout from "../components/user/ProfileAbout";
import ProfileEducation from "../components/user/ProfileEducation";

const string =
  "Collection：SHOCK WAVE 5\r\n" +
  "\r\n" +
  "Category：Basketball Shoes\r\n" +
  "\r\n" +
  "Gender：Men\r\n" +
  "\r\n" +
  "Upper：Mesh/PP FILM/SYNTHE PU\r\n" +
  "\r\n" +
  "Outsole：TPU/rubber/carbon fiber\r\n" +
  "\r\n" +
  "Sytle No：112331106\r\n" +
  "\r\n" +
  "\r\n" +
  "\r\n" +
  "Logistics Services：\r\n" +
  "\r\n" +
  "Usually it takes about 2 days from our warehouse to Shopee Sorting Center, then takes about 7-14 days to receiving address, you can check with the carrier and tracking number when it arrives.\r\n" +
  "\r\n" +
  "\r\n" +
  "\r\n" +
  "Customer Services Worktime：\r\n" +
  "\r\n" +
  "From 9am. to 8pm. in every workday, if you have any question during our non-work time, we will respone you as soon as in worktime.\r\n" +
  "\r\n" +
  "\r\n" +
  "\r\n" +
  "Notes：\r\n" +
  "\r\n" +
  "Due to the light and screen setting difference, the items color may be slightly different from the pictures.\r\n" +
  "\r\n" +
  "Please choose the appropriate size according to the size chart.";

function UserProfile() {
  return (
    <div className="sm:py-8 profile">
      <div className="container mx-auto">
        <ProfileIntro />
        <ProfileAbout data={string} />
        <ProfileEducation />
      </div>
    </div>
  );
}

export default UserProfile;
