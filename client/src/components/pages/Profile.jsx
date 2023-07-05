import React from "react";
import "./userStyle.css";
const UserProfile = () => {
  return (
    <div className="user-profile">
      <h2>User Profile</h2> 
      {/* change it so it render user name with welcome to your profile */}

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
            {/* <span>{userProfile.full_name}</span> */}
          </div>
          <div className="profile-field">
            <label>Email:</label>
            {/* <span>{userProfile.email}</span> */}
          </div>
          <div className="profile-field">
            <label>Phone Number:</label>
            {/* <span>{userProfile.phone_number}</span> */}
          </div>
          <div className="profile-field">
            <label>Address:</label>
            {/* <span>{userProfile.address}</span> */}
          </div>

          <div className="profile-field">
            <label>Department:</label>
            {/* <span>{userProfile.departement}</span> */}
          </div>
        </div>
      </div>
      <div>
        <button>Click Me ! </button>
      </div>
    </div>
  );
};

export default UserProfile;
