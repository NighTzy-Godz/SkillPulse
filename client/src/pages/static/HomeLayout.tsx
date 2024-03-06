import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../../components/ui/MainNav";
import MainLoader from "../../components/ui/MainLoader";

interface HomeLayoutProps {
  token: null | string;
}

function HomeLayout({ token }: HomeLayoutProps) {
  // const [ready, setReady] = useState(false);
  // const [timer, setTimer] = useState(0);
  // useEffect(() => {
  //   if (ready) return;
  //   if (timer === 6) return setReady(true);
  //   const timerId = setTimeout(() => {
  //     setTimer(timer + 1);
  //   }, 1000);

  //   return () => clearTimeout(timerId);
  // }, [ready, timer]);
  // if (!ready) {
  //   return <MainLoader />;
  // }
  return (
    <React.Fragment>
      <MainNav token={token} />
      <Outlet />
    </React.Fragment>
  );
}

export default HomeLayout;
