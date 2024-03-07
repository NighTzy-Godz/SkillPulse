import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompanyData } from "../../store/slices/company";
import { State } from "../../store/store";
import CompanyIntro from "../../components/company/CompanyIntro";
import CompanyAbout from "../../components/company/CompanyAbout";
import { UserType, setUserType } from "../../store/slices/ui";
import Loading from "../../components/common/Loading";

function CompanyProfile() {
  const dispatch = useDispatch();
  const { companyId } = useParams();

  const { currCompany, loading } = useSelector(
    (state: State) => state.entities.company
  );

  useEffect(() => {
    if (companyId && !currCompany) {
      dispatch(getCompanyData(companyId as string));
      dispatch(setUserType(UserType.COMPANY));
    }
  }, [companyId, currCompany]);

  if (loading) return <Loading />;
  return (
    <div className="sm:py-8 profile">
      <div className="sm:container mx-auto">
        <CompanyIntro />
        <CompanyAbout />
      </div>
    </div>
  );
}

export default CompanyProfile;
