import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import SearchSnippetCard from "./SearchSnippetCard";
import { setShowSearchSnippet } from "../../store/slices/ui";

function SearchSnippet() {
  const dispatch = useDispatch();
  const searchedUsers = useSelector(
    (state: State) => state.entities.user.searchedUsers
  );

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        dispatch(setShowSearchSnippet(false));
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [cardRef]);

  const renderContent = () => {
    if (searchedUsers.length === 0)
      return (
        <p className="font-semibold text-zinc-500 text-center py-2">
          No user found
        </p>
      );
    return searchedUsers.map((item) => {
      return (
        <React.Fragment key={item._id}>
          <SearchSnippetCard data={item} />
        </React.Fragment>
      );
    });
  };
  return (
    <div
      ref={cardRef}
      className="mt-2 absolute w-full z-50 bg-gray-100 px-3 py-1 boxShadow2 max-h-[200px] overflow-auto"
    >
      {renderContent()}
    </div>
  );
}

export default SearchSnippet;
