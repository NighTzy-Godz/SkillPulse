import { Navbar, Dropdown, Avatar } from "flowbite-react";

import { NavLink } from "react-router-dom";

interface MainNavProps {
  token: null | string;
}

function MainNav({ token }: MainNavProps) {
  const navBarClass =
    "transition-all duration-200 block py-2 text-lg pr-4 pl-3  border-b border-gray-100 text-gray-700   md:border-0 md:hover:hover:text-blue-500 md:p-0";
  return (
    <Navbar fluid className=" py-5 mainNav boxShadow2">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-blue-500 font-semibold text-2xl dark:text-white lg:text-3xl ">
            SkillPulse
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {token ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
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
