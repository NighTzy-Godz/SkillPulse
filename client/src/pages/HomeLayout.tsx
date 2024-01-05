import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/ui/MainNav";

interface HomeLayoutProps {
  token: null | string;
}

function HomeLayout({ token }: HomeLayoutProps) {
  return (
    <React.Fragment>
      <MainNav token={token} />
      <Outlet />
    </React.Fragment>
  );
}

export default HomeLayout;
