import React, { useState } from "react";
import ProfileCard from "../common/ProfileCard";

import { FaEdit } from "react-icons/fa";
import NoProfileData from "../common/NoProfileData";
const data =
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

function ProfileAbout() {
  const [clicked, setClicked] = useState(false);

  const slicedData = !clicked ? `${data.slice(0, 80)} ...` : data;

  const renderAbout = () => {
    if (!data) return <NoProfileData />;

    return (
      <React.Fragment>
        <p className="mb-5 text-gray-600 text-sm whitespace-pre-wrap">
          {slicedData}
        </p>
      </React.Fragment>
    );
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
          {clicked ? "... see less" : "... see more"}
        </p>
      </div>
    </ProfileCard>
  );
}

export default ProfileAbout;
