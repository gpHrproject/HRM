import { Button, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Style.css';

const SubmitButton = ({ form, submittable }) => {
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submittable, setSubmittable] = useState(false);
  const navigate = useNavigate(); 

  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    const isFormValid = Object.values(values).every((value) => value !== '');
    setSubmittable(isFormValid);
  };

  const handleSubmit = (values) => {
    axios
      .post('http://localhost:3000/register', values)
      .then((response) => {
        console.log('User added');
        navigate('/login'); 
      })
      .catch((err) => {
        setError('Error adding the User');
        console.error(err);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='Rg-container'>
      <h1>Register new Employee</h1>
      {error && <p>{error}</p>}
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
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
          <Input.Password value={password} onChange={handlePasswordChange} />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} submittable={submittable} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
