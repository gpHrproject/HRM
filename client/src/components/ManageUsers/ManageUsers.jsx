import React, { useState, useEffect } from "react";
import CreateUser from "../createUser/CreateUser.jsx";
import axios from "axios";
import './StyleManageUsers.css';
import ShowBooking from "../Booking/ShowBooking.jsx";

const ManageUsers = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const getAllUsers = () => {
        axios
          .get("http://localhost:3000/users", config)
          .then((res) => {
            setUserData(res.data); 
            console.log(res.data); 
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getAllUsers();
    }
  }, []);

  console.log("ManageUsers", userData);

  const handleDeleteUser = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(`http://localhost:3000/users/${id}`, config)
        .then((res) => {
          console.log(res.data);
          // Update the user data after deletion
          setUserData(userData.filter((user) => user.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateUser = async (user) => {
    setSelectedUser(user);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:3000/users/${user.id}/profile`, config);
        const userProfile = response.data;

        setUserProfileData(userProfile);
        setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedData = { ...userProfileData, ...formData };

      axios
        .put(`http://localhost:3000/users/${selectedUser.id}/profile`, updatedData, config)
        .then((res) => {
          console.log(res.data);
          // You can update the user profile data in the frontend based on the response
          setUserProfileData(res.data);
          // Close the popup
          setShowPopup(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="manage-users">
      <CreateUser/>
      <h2>Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>employee</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Email</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((e) => (
            <tr key={e.id}>
              <td>{e.image}</td>
              <td>{e.username}</td>
              <td>{e.createdAt}</td>
              <td>{e.email}</td>
              <td>{e.updatedAt}</td>
              <td>
                <button onClick={() => handleDeleteUser(e.id)}>Delete</button>
                <button onClick={() => handleUpdateUser(e)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="display-booking-wrap">
      <h2>Booking</h2>
        <ShowBooking/>
      </div>
      
      {showPopup && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <h3>Edit Profile</h3>
            <form className="profile-form" onSubmit={handleProfileUpdate}>
              <label>Full Name:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name || userProfileData.full_name}
                onChange={handleInputChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || userProfileData.email}
                onChange={handleInputChange}
              />
              <label>Number:</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number || userProfileData.phone_number}
                onChange={handleInputChange}
              />
                  <label>Departement:</label>
              <input
                type="text"
                name="departement"
                value={formData.departement || userProfileData.departement}
                onChange={handleInputChange}
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

export default ManageUsers;
