import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./userStyle.css";
import axios from "axios";
import Booking from "../Booking/Booking";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    departement: "",
    phone_number: "",
    address: "",
  });

  const token = localStorage.getItem("token");
  let userId;
  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const [currentUser, setCurrentUser] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    console.log("userId", userId);
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCurrentUser(response.data);
        setFormData({
          full_name: response.data.full_name,
          email: response.data.email,
          departement: response.data.departement,
          phone_number: response.data.phone_number,
          address: response.data.address,
          createdAt: response.data.createdAt,
        });
      } catch (error) {
        console.log(error);
        alert("Failed to load user data");
      }
    };

    if (userId && token) {
      fetchUserProfile();
    }
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentUser(response.data);
      setShowEditPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = () => {
    setShowEditPopup(true);
  };

  const handlePopupClose = () => {
    setShowEditPopup(false);
  };

  if (!currentUser) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-profile-top">
        <h2>Welcome: {currentUser.full_name}</h2>
        <div>
          <button className="btn-profile-top" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-field">
          <img
            className="user-img"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
            alt="Profile"
          />
        </div>

        <div className="profile-info">
          <div className="profile-field">
            <label>Full Name:</label>
            <span>{currentUser.full_name}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{currentUser.email}</span>
          </div>
          <div className="profile-field">
            <label>Department:</label>
            <span>{currentUser.departement}</span>
          </div>
          <div className="profile-field">
            <label>Phone Number:</label>
            <span>{currentUser.phone_number}</span>
          </div>
          <div className="profile-field">
            <label>Address:</label>
            <span>{currentUser.address}</span>
          </div>
          <div className="profile-field">
            <label>created at:</label>
            <span>{currentUser.createdAt}</span>
          </div>
        </div>
      </div>
      <div className="profile-Booking">
        <span>day Off Booking</span>
        <Booking />
      </div>
      {showEditPopup && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <h3>Edit Profile</h3>
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>Full Name:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label>Department:</label>
              <input
                type="text"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
              />
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <div className="popup-buttons">
                <button className="btn-profile" type="submit">
                  Save
                </button>
                <button className="btn-profile" onClick={handlePopupClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
