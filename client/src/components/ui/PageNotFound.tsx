import { Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { State } from "../../store/store";

function PageNotFound() {
  const navigate = useNavigate();
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const homeUrl = currUserId ? `/user/profile/${currUserId}` : "/";
  return (
    <div className="h-dvh w-full grid place-content-center ">
      <div className="px-5  w-full">
        <h2 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold text-blue-400 text-center">
          STATUS 404
        </h2>
        <p className="text-center mt-4 capitalize text-zinc-600 lg:text-2xl md:text-xl text-lg">
          we are sorry, but the page you requested was not found
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-4">
          <Link
            to={homeUrl}
            className="lg:text-lg md:text-base p-3  text-sm bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition ease-in-out duration-300 flex items-center"
          >
            Go Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="lg:text-lg md:text-base  text-sm p-3 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition ease-in-out duration-200 "
          >
            Navigate Last Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
