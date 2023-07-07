import React from "react";
import CreateUser from "../createUser/CreateUser.jsx"
import './StyleManageUsers.css'
const ManageUsers = ({ user }) => {
  console.log("ManageUsers", user);
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
          {user.map((e) => (
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
    </div>
  );
};

export default ManageUsers;
