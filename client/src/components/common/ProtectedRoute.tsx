import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [count, setCount] = useState(0);
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  useEffect(() => {
    setCount(1);
  }, []);

  if (count === 0) return;

  if (!currUserId) {
    toast.error("Sorry but you are not authenticated. Please login first", {
      autoClose: 2500,
      toastId: "Auth Error",
    });
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
