import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/ui/MainNav";

function HomeLayout() {
  return (
    <React.Fragment>
      <MainNav />
      <Outlet />
    </React.Fragment>
  );
}

export default HomeLayout;
