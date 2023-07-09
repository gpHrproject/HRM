import React, { useState, useEffect } from "react";
import CreateUser from "../createUser/CreateUser.jsx";
import axios from "axios";
import './StyleManageUsers.css';
import DisplayBooking from "../Booking/DisplayBooking.jsx";

const ManageUsers = () => {
  const [userData, setUserData] = useState([]);

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

  return (
    <div className="manage-users">
      <CreateUser/>
      <table className="user-table">
        <thead>
          <tr>
            <th>employee</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Email</th>
            <th>Updated At</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="display-booking-wrap">
       <DisplayBooking/>
      </div>
      
    </div>
  );
};

export default ManageUsers;
