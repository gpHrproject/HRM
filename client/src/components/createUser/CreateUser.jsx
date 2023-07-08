import React, { useState } from "react";
import axios from "axios";
import './Style.css'
const CreateUser = ({ setShowEditPopup }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post("http://localhost:3000/users", newUser, config)
        .then((response) => {
          console.log("User created successfully!");
          setShowEditPopup(false);
        })
        .catch((error) => {
          console.log("Error creating user:", error);
        });
    } else {
      console.log("Token not found!");
    }
  };

  const handleCancel = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="edit-profile-popup">
      
      <div className="form-field">
        <label>Full Name:</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="popup-buttons">
        <button id="btn-add" className="btn" onClick={handleCreateUser}>add</button>
        <button id="btn-cancel"className="btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

const ParentComponent = () => {
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleOpenEditPopup = () => {
    setShowEditPopup(true);
  };

  return (
    <div>
      
      <button className="btn-add" onClick={handleOpenEditPopup}>add employee</button>
      {showEditPopup && <CreateUser setShowEditPopup={setShowEditPopup} />}
      
    </div>
  );
};

export default ParentComponent; 
