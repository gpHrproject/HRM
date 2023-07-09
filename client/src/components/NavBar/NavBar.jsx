import React, { useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Style.css";
import { SettingOutlined,UserOutlined,ProfileOutlined,LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const role = decodedToken?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogout(false);
  };

  return (
    <div className="navbar-wrapper">
      <h1 className="">HR</h1>

      <ul className="navbar-list">
        <li>
          <Link to="/blog" className="navbar-link">
            <ProfileOutlined />
          </Link>
        </li>
        {role !== "hr" && (
          <li>
            <Link to="/profile" className="navbar-link">
            <UserOutlined />
            </Link>
          </li>
        )}
        {token && role === "hr" && (
          <li>
            <Link to="/ManageUsers" className="navbar-link">
              <SettingOutlined />
            </Link>
          </li>
        )}
        {token &&(
          <li onClick={handleLogout}>
            <Link to="/login" className="navbar-link">
            <LogoutOutlined />
            </Link>
           
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
