import React from 'react';
import './Style.css'
const Navbar = ({ role }) => {
  const handleLogout = () => {
    // Handle logout functionality
  };

  return (
    <nav className='nav-Container'>
      <ul className='nav-Container-ele'>
        <li><a href="/">Blog</a></li>
        {role === 'hr' && <li><a href="/manageEmployee">Manage Employees</a></li>}
        <li>
          <div className="user-profile">
            <img src="" alt="" />
            <div className="dropdown">
              
              <div className="dropdown-content">
                <a href="/logout" onClick={handleLogout}>Log Out</a>
                {role === 'hr' && <a href="/createUser">Create User</a>}
                <a href="/profile">Profile</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
