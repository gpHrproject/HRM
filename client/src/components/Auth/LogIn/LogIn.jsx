import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styleLogIn.css';

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        console.log("response", res);
        navigate("/blog");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <p className="login-title">LogIn</p>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">email:</label>
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login-label">password:</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">LogIn</button>
      </form>
    </div>
  );
};

export default LogIn;
