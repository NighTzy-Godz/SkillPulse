import React from "react";
import { FaSearch } from "react-icons/fa";

import { IUser } from "../../interfaces/User";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowSearchSnippet } from "../../store/slices/ui";

interface SearchSnippetCardProps {
  data: IUser;
}

function SearchSnippetCard({ data }: SearchSnippetCardProps) {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, pfp } = data;
  return (
    <Link
      to={`/user/profile/${_id}`}
      className=" py-1 mb-1 block"
      onClick={() => dispatch(setShowSearchSnippet(false))}
    >
      {" "}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <FaSearch />
          <p className="text-zinc-700">
            {firstName} {lastName}
          </p>
        </div>
        <img className="w-10 h-10 object-cover rounded-full" src={pfp} alt="" />
      </div>
    </Link>
  );
}

export default SearchSnippetCard;
