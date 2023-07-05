import axios from "axios";
import React, { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>LogIn</p>
      <form onSubmit={handleLogin}>
        <label>email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>LogIn</button>
      </form>
    </div>
  );
};

export default LogIn;
