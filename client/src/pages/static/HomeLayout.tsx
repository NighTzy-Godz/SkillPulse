import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../../components/ui/MainNav";
import MainLoader from "../../components/ui/MainLoader";
import FooterNav from "../../components/ui/Footer";

interface HomeLayoutProps {
  token: null | string;
}

function HomeLayout({ token }: HomeLayoutProps) {
  return (
    <React.Fragment>
      <MainNav token={token} />
      <Outlet />
      <FooterNav />
    </React.Fragment>
  );
}

export default HomeLayout;
