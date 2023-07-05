import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  return (
    <nav className="nav-Container">
      <ul className="nav-Container-ele">
        <li>
          <a href="/">Blog</a>
        </li>

        <li>
          <a href="/manageEmployee">Manage Employees</a>
        </li>

        <li>
          <div className="user-profile">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
              alt=""
            />
            <div className="dropdown">
              <div className="dropdown-content">
                {/* <a href="/logout" onClick={handleLogout}>
                  Log Out
                </a> */}
                {role === "hr" && <a href="/createUser">Create User</a>}
                <Link to="/profile">User Profile</Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
