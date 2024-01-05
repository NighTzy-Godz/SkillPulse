import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import RegisterCompany from "./pages/RegisterCompany";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./store/store";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const authToken = useSelector((state: State) => state.entities.auth.token);
  const localToken = localStorage.getItem("token");
  const token = localToken || authToken;

  useEffect(() => {
    if (!token) return;
    try {
      localStorage.setItem("token", token);
    } catch (error) {}
  }, [token]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout token={token} />}>
          <Route index element={<Home />} />

          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-company" element={<RegisterCompany />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
