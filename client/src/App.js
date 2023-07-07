import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserProfile from "./components/pages/Profile";
import Register from "./components/Auth/Register/Register";
import LogIn from "./components/Auth/LogIn/LogIn";
import axios from "axios";
import Blog from "./components/Blog/Blog";
import Booking from "./components/Booking/Booking";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Reporting from "./components/Reporting/Reporting";

const App = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const getAllUsers = () => {
        axios
          .get("http://localhost:3000/users", config)
          .then((res) => {
            setUserData(res.data); // Use res.data instead of res.userData
            console.log(res.data); // Log the received data instead of userData
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getAllUsers();
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<UserProfile user={userData} />} />
        <Route path="/ManageUsers" element={<ManageUsers user={userData} />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/reporting" element={<Reporting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

