import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import "./userStyle.css";
import EditProfilePopup from "./EditProfile";

const UserProfile = ({ user }) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const currentUser = user.find((e) => e.id === userId);

  const [showEditPopup, setShowEditPopup] = useState(false);

  if (!currentUser) {
    return <div>No user found</div>;
  }

  return (
    <div className="user-profile">
      <h2>Welcome: {currentUser.username}</h2>
      <div className="container">
        <div className="profile-field">
          <img
            id="user-img"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <div className="profile-field">
            <label>Full Name:</label>
            <span>{currentUser.username}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{currentUser.email}</span>
          </div>
          <div className="profile-field">
            <label>Department:</label>
            <span>{currentUser.department}</span>
          </div>
          <div className="profile-field">
            <label>phoneNumber:</label>
            <span>{currentUser.department}</span>
          </div>
          <div className="profile-field">
            <label>adress:</label>
            <span>{currentUser.department}</span>
          </div>
          
        </div>
      </div>
      <div>
        <button onClick={() => setShowEditPopup(true)}>Edit Profile</button>
      </div>
      {showEditPopup && <EditProfilePopup currentUser={currentUser} setShowEditPopup={setShowEditPopup} />}
    </div>
  );
};

export default UserProfile;
