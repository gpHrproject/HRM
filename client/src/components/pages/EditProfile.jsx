import React, { useState } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './popup.css';

const EditProfilePopup = ({ currentUser, setShowEditPopup }) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    username: currentUser.username,
    email: currentUser.email,
    department: currentUser.department,
    phoneNumber:currentUser.phoneNumber,
    adress:currentUser.adress
  });

  const handleInputChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      axios
        .put(`http://localhost:3000/users/${userId}/profile`, updatedProfile, config)
        .then((response) => {
          currentUser.username = updatedProfile.username;
          currentUser.email = updatedProfile.email;
          currentUser.department = updatedProfile.department;

          setShowEditPopup(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCancel = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="edit-profile-popup">
      <h3>Edit Profile</h3>
      <div className="form-field">
        <label>Full Name:</label>
        <input
          type="text"
          name="username"
          value={updatedProfile.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={updatedProfile.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={updatedProfile.department}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>phoneNumber:</label>
        <input
          type="text"
          name="phoneNumber"
          value={updatedProfile.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>adress:</label>
        <input
          type="text"
          name="V"
          value={updatedProfile.adress}
          onChange={handleInputChange}
        />
      </div>
      <div className="popup-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
