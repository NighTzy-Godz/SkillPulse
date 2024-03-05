import { Dropdown, Avatar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { State } from "../../store/store";

import React, { ChangeEvent, useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import { getSearchedUsers } from "../../store/slices/user";
import SearchSnippet from "./SearchSnippet";
import { setShowSearchSnippet } from "../../store/slices/ui";
interface MainNavProps {
  token: null | string;
}

function MainNav({ token }: MainNavProps) {
  const dispatch = useDispatch();
  const { showSearchSnippet } = useSelector(
    (state: State) => state.entities.ui
  );

  const user = useSelector((state: State) => state.entities.user.authUser);
  const userId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const currUserCompanyId = useSelector(
    (state: State) => state.entities.auth.decodedModel?.company
  );

  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const companyFound = user?.company;

  const navBarClass =
    "transition-all duration-200 block py-2 text-lg pr-4 pl-3  border-b border-gray-100 text-gray-700 md:border-0 md:hover:hover:text-blue-500 md:p-0";

  useEffect(() => {
    let searchId: NodeJS.Timeout;
    if (!searchTerm) dispatch(setShowSearchSnippet(false));
    if (searchTerm) {
      searchId = setTimeout(() => {
        dispatch(getSearchedUsers(searchTerm));
        dispatch(setShowSearchSnippet(true));
      }, 1500);
    }

    return () => clearTimeout(searchId);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <div className="mainNav boxShadow2 md:py-5 py-3 relative ">
      <div className="container mx-auto flex flex-wrap items-center  gap-4 justify-between lg:justify-normal lg:flex-nowrap">
        <div className=" w-auto">
          <span className="self-center whitespace-nowrap text-blue-500 font-semibold text-2xl dark:text-white md:text-3xl text-2xl">
            SkillPulse
          </span>{" "}
        </div>

        <div className="flex items-center lg:order-2 ">
          {token ? (
            <Dropdown
              inline
              size="xs"
              arrowIcon={false}
              label={
                <Avatar
                  alt="User settings"
                  img={user?.pfp}
                  rounded
                  className="mainNavPfp"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={`/user/profile/${userId}`}>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/user/jobs"> Jobs</Link>
              </Dropdown.Item>{" "}
              {companyFound ? (
                <React.Fragment>
                  <Dropdown.Item>
                    <Link to={`/company/${currUserCompanyId}/manageJobPosts`}>
                      Manage Job Posts
                    </Link>
                  </Dropdown.Item>{" "}
                  <Dropdown.Item>
                    {" "}
                    <Link to={`/company/profile/${companyFound._id}`}>
                      Manage: {companyFound.name}
                    </Link>
                  </Dropdown.Item>
                </React.Fragment>
              ) : (
                <Dropdown.Item>
                  {" "}
                  <Link to="/register-company">Register Company</Link>
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item>
                <Link to="/logout">Logout</Link>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              {" "}
              <NavLink to="/register-user" className={navBarClass}>
                Register
              </NavLink>
            </>
          )}

          <div
            className="lg:hidden block mt-1 ml-1 hamburger"
            onClick={() => setToggle(!toggle)}
          >
            <GiHamburgerMenu />
          </div>
        </div>

        <div
          className={` ${
            toggle ? "block w-full" : "hidden"
          } lg:block lg:w-full w-3/4 `}
        >
          {" "}
          <div className="flex items-center flex-col lg:flex-row justify-between">
            <div className="lg:w-2/5 lg:mt-0 mt-3 w-full flex-col  order-2 bg  relative">
              <SearchBar
                placeholder="Search User Here ..."
                onChange={handleSearchChange}
              />
              {showSearchSnippet && <SearchSnippet />}
            </div>
            <ul className="md:flex gap-4 lg:w-1/2  lg:flex-row flex-col  w-full justify-end lg:order-2">
              <NavLink
                to={`/${token ? `user/profile/${userId}` : ""}`}
                className={navBarClass}
              >
                Home
              </NavLink>

              <NavLink to="/searchJobs" className={`${navBarClass}`}>
                Find a Job
              </NavLink>

              {!token && (
                <NavLink to="/login-user" className={navBarClass}>
                  Login
                </NavLink>
              )}

              {token && companyFound && (
                <NavLink
                  to={`/company/${user?.company?._id}/createJob`}
                  className={`${navBarClass}`}
                >
                  Post a Job
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
