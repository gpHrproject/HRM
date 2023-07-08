import React, { useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Style.css";
import logo from "../../assets/logo.png";

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
      <div className="navbar-logo">
        <img className="nav-logo" src={logo} alt="Logo" />
      </div>

      <ul className="navbar-list">
        <li>
          <Link to="/blog" className="navbar-link">
            Blog
          </Link>
        </li>
        {role !== "hr" && (
          <li>
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </li>
        )}
        {token && role === "hr" && (
          <li>
            <Link to="/ManageUsers" className="navbar-link">
              Manage Employees
            </Link>
          </li>
        )}
        {token && (
          <div className="user-profile">
            <div className="dropdown">
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
                alt=""
                className="profile-image"
              />
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <Link to="/profile" className="dropdown-link">
                    Profile
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link onClick={handleLogout} to="/login" className="dropdown-link">
                    Logout
                  </Link>
                </div>
                {showLogout && role === "hr" && (
                  <div className="dropdown-item">
                    <Link to="/ManageUsers" className="dropdown-link">
                      Manage Users
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
