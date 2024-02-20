import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { useNavigate } from "react-router-dom";

function AuthNavigator() {
  const navigate = useNavigate();
  const { decodedModel } = useSelector((state: State) => state.entities.auth);

  useEffect(() => {
    if (decodedModel?.role === "User")
      return navigate(`/user/profile/${decodedModel._id}`);
  }, [decodedModel]);

  return null;
}

export default AuthNavigator;
