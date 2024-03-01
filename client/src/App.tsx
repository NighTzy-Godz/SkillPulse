import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/static/HomeLayout";
import Home from "./pages/static/Home";
import RegisterUser from "./pages/user/RegisterUser";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import RegisterCompany from "./pages/company/RegisterCompany";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./store/store";
import { useEffect } from "react";
import UserProfile from "./pages/user/UserProfile";
import { jwtDecode } from "jwt-decode";
import { setDecodedModel } from "./store/slices/auth";
import AuthNavigator from "./pages/static/AuthNavigator";
import CompanyProfile from "./pages/company/CompanyProfile";
import CompanyNavigator from "./pages/static/CompanyNavigator";
import { getAuthUserData, getUserData } from "./store/slices/user";
import Logout from "./pages/static/Logout";
import CreateJob from "./pages/jobs/CreateJob";
import AllJobs from "./pages/jobs/AllJobs";
import ApplyJob from "./pages/user/ApplyJob";
import Jobs from "./pages/user/Jobs";
import ViewJob from "./pages/jobs/ViewJob";
import CreatedJobList from "./pages/company/CreatedJobList";
import CreatedJobDetails from "./pages/company/CreatedJobDetails";
import DetailsEducation from "./pages/user/DetailsEducation";
import DetailsExp from "./pages/user/DetailsExp";
import Applicants from "./pages/company/Applicants";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const user = useSelector((state: State) => state.entities.user.userData);

  const authToken = useSelector((state: State) => state.entities.auth.token);
  const localToken = localStorage.getItem("token");
  const token = localToken || authToken;

  useEffect(() => {
    if (!token) return;
    try {
      const decodedUser = jwtDecode(token);
      dispatch(setDecodedModel(decodedUser));
      localStorage.setItem("token", token);
    } catch (error) {}
  }, [token]);

  useEffect(() => {
    if (userId && !user) {
      dispatch(getAuthUserData(userId as string));
    }
  }, [userId]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout token={token} />}>
          <Route index element={<Home />} />

          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-company" element={<RegisterCompany />} />

          <Route path="/user/profile/:userId" element={<UserProfile />} />
          <Route
            path="/user/profile/:userId/education"
            element={<DetailsEducation />}
          />
          <Route
            path="/user/profile/:userId/experience"
            element={<DetailsExp />}
          />

          <Route path="/user/applyJob/:jobId" element={<ApplyJob />} />
          <Route path="/user/jobs" element={<Jobs />}></Route>

          <Route
            path="/company/profile/:companyId"
            element={<CompanyProfile />}
          />

          <Route path="/company/:companyId/createJob" element={<CreateJob />} />
          <Route path="/company/manageJobPosts" element={<CreatedJobList />} />
          <Route
            path="/company/createdJob/:jobId"
            element={<CreatedJobDetails />}
          />
          <Route path="/company/:jobId/applicants" element={<Applicants />} />

          <Route path="/viewJob/:jobId" element={<ViewJob />} />
          <Route path="/searchJobs" element={<AllJobs />} />

          <Route path="/cold-login" element={<AuthNavigator />} />
          <Route path="/company-navigator" element={<CompanyNavigator />} />

          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
