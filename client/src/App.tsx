import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import RegisterCompany from "./pages/RegisterCompany";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />

          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-company" element={<RegisterCompany />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
