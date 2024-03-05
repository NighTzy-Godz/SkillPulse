import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { Navigate, useParams } from "react-router-dom";

interface UserOwnedProps {
  children: ReactNode;
}

function UserOwned({ children }: UserOwnedProps) {
  const { userId } = useParams();
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );

  if (currUserId !== userId) {
    return <Navigate to={`/user/profile/${currUserId}`} />;
  }

  return <>{children}</>;
}

export default UserOwned;
