import React from "react";
import "./userStyle.css";
const UserProfile = ({user}) => {
  console.log('user',user)
  return (
    user.map((e)=>{
      return(
        <div className="user-profile">
        <h2>welcome:{e.username}</h2> 
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
              { <span>{e.username}</span> }
            </div>
            <div className="profile-field">
              <label>Email:</label>
              {<span>{e.email}</span> }
            </div>
            <div className="profile-field">
              <label>Department:</label>
              { <span>{e.departement}</span> }
            </div>
          </div>
        </div>
        <div>
          <button>Click Me ! </button>
        </div>
      </div>
      )
    })
  );
};

export default UserProfile;
