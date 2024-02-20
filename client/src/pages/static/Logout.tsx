import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    try {
      localStorage.removeItem("token");
      (window as Window).location = "/";
    } catch (error) {}
  }, []);

  return null;
}

export default Logout;
