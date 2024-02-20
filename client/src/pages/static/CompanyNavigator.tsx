import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { useNavigate } from "react-router-dom";

function CompanyNavigator() {
  const navigate = useNavigate();
  const companyId = useSelector(
    (state: State) => state.entities.user.registeredCompany?._id
  );
  const userId = useSelector(
    (state: State) => state.entities.user.userData?._id
  );

  useEffect(() => {
    if (companyId) return navigate(`/company/profile/${companyId}`);
    if (userId) return navigate(`/user/profile/${userId}`);
    return navigate("/");
  }, [companyId]);

  return null;
}

export default CompanyNavigator;
