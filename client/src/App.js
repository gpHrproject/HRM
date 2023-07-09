import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserProfile from "./components/pages/Profile";
import Register from "./components/Auth/Register/Register";
import LogIn from "./components/Auth/LogIn/LogIn";
import axios from "axios";
import Blog from "./components/Blog/Blog";
import Booking from "./components/Booking/Booking";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Reporting from "./components/Reporting/Reporting";
import CreateUser from "./components/createUser/CreateUser";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isAuthPage && <NavBar />}
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/ManageUsers" element={<ManageUsers />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        
      </Routes>
    </>
  );
};

export default App;
