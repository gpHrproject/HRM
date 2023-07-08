import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register/Style.css";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (values) => {
    axios
      .post("http://localhost:3000/login", values)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        console.log("response", res);
        navigate("/blog");
      })
      .catch((err) => {
        setError("Error logging in");
        console.log(err);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Rg-container">
      <h1>LogIn</h1>
      {error && <p>{error}</p>}
      <Form
        name="loginForm"
        layout="vertical"
        autoComplete="off"
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;
