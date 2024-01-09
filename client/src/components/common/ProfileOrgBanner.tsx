import React from "react";
import { Link } from "react-router-dom";

function ProfileOrgBanner() {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10">
        <img
          src="https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
          alt=""
        />
      </div>
      <div className="ml-1 ">
        <Link
          to="#"
          className="text-sm text-zinc-700 hover:text-blue-400 hover:underline"
        >
          The Whitney Card
        </Link>
        <p
          className="text-xs text-zinc-600 font-bold"
          style={{ lineHeight: ".6" }}
        >
          Main Developer
        </p>
      </div>
    </div>
  );
}

export default ProfileOrgBanner;
