import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import RegisterCompany from "./pages/RegisterCompany";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./store/store";
import { useEffect } from "react";
import UserProfile from "./pages/UserProfile";
import { jwtDecode } from "jwt-decode";
import { setDecodedModel } from "./store/slices/auth";
import AuthNavigator from "./pages/AuthNavigator";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyNavigator from "./pages/CompanyNavigator";
import { getUserData } from "./store/slices/user";
import Logout from "./pages/Logout";
import CreateJob from "./pages/CreateJob";
import AllJobs from "./pages/AllJobs";
import ApplyJob from "./pages/ApplyJob";
import Jobs from "./pages/Jobs";
import ViewJob from "./pages/ViewJob";

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
      dispatch(getUserData(userId as string));
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
          <Route path="/user/applyJob/:jobId" element={<ApplyJob />} />
          <Route path="/user/jobs" element={<Jobs />}></Route>

          <Route
            path="/company/profile/:companyId"
            element={<CompanyProfile />}
          />

          <Route path="/company/:companyId/createJob" element={<CreateJob />} />

          <Route path="/searchJobs" element={<AllJobs />} />

          <Route path="/cold-login" element={<AuthNavigator />} />
          <Route path="/company-navigator" element={<CompanyNavigator />} />
          <Route path="/viewJob/:jobId" element={<ViewJob />} />

          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
