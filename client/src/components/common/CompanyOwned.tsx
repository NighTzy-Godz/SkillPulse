import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { State } from "../../store/store";
import { toast } from "react-toastify";

interface CompanyOwnedProps {
  children: ReactNode;
}

function CompanyOwned({ children }: CompanyOwnedProps) {
  const { companyId } = useParams();

  const currUserCompany = useSelector(
    (state: State) => state.entities.auth.decodedModel?.company
  );

  if (!currUserCompany) {
    toast.error(
      "You dont have any registered company. Please register before proceeding",
      { autoClose: 2500, toastId: "Not Registed company" }
    );

    return <Navigate to={`/register-company`} />;
  }

  if (currUserCompany !== companyId) {
    toast.error(
      "Sorry but you dont own the company. You cannot do that action",
      { autoClose: 2500, toastId: "Not Own Company" }
    );
    return <Navigate to={`/company/profile/${currUserCompany}`} />;
  }

  return <>{children}</>;
}

export default CompanyOwned;
