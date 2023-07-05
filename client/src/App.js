import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/pages/Home';
import UserProfile from './components/pages/Profile';
import Register from './components/Auth/Register/Register';
import LogIn from './components/Auth/LogIn/LogIn';
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState([]);
   
  useEffect (()=>{
   const getAllUsers =()=>{
    axios.get('http://localhost:3000/users')
    .then((res)=>{
      setUserData(res.userData)
      console.log(userData)
    })
    .catch ((err)=>{
      console.log(err)
    })
   }
   getAllUsers()
  },[])

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
