import React, { useState } from "react";
import "./Style.css";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  const [showLogout, setShowLogout] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogout(false);
  };

  return (
    <nav className="nav-Container">
      <ul className="nav-Container-ele">
        <li>
          <a href="/blogc">Blog</a>
        </li>

        {token && (
          <li>
            <a href="/manageEmployee">Manage Employees</a>
          </li>
        )}

        <li>
          {token && (
            <div className="user-profile">
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
                alt=""
              />

              <div className="dropdown">
                <div className="dropdown-content">
                  <div>
                    <Link to="/profile">User Profile</Link>
                  </div>
                  <div>
                    <Link onClick={handleLogout} to="/login">
                      Logout
                    </Link>
                  </div>
                  {showLogout && role === "hr" && (
                    <div>
                      <Link to="/ManageUsers">manageUsers</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
