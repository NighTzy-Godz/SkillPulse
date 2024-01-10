import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { useSelector } from "react-redux";

import { Link, NavLink } from "react-router-dom";
import { State } from "../../store/store";

interface MainNavProps {
  token: null | string;
}

function MainNav({ token }: MainNavProps) {
  const user = useSelector((state: State) => state.entities.user.userData);
  const userId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const navBarClass =
    "transition-all duration-200 block py-2 text-lg pr-4 pl-3  border-b border-gray-100 text-gray-700   md:border-0 md:hover:hover:text-blue-500 md:p-0";
  return (
    <Navbar fluid className="  mainNav boxShadow2 md:py-5 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-blue-500 font-semibold text-2xl dark:text-white md:text-3xl text-2xl">
            SkillPulse
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {token ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={user?.pfp} rounded />}
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
                <Link to="#">Saved Jobs</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <NavLink to="/register-user" className={navBarClass}>
              Register
            </NavLink>
          )}

          <Navbar.Toggle className="text-zinc-600" />
        </div>
        <Navbar.Collapse>
          {!token && (
            <NavLink to="/" className={navBarClass}>
              Home
            </NavLink>
          )}

          <NavLink to="/jobs" className={`cursor-not-allowed ${navBarClass}`}>
            Find Job
          </NavLink>
          <NavLink
            to="/postJob"
            className={`cursor-not-allowed ${navBarClass}`}
          >
            Post a Job
          </NavLink>
          {token && (
            <NavLink to="/register-company" className={navBarClass}>
              Register Company
            </NavLink>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default MainNav;
