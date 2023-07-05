import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/pages/Home';


const App = () => (
  <BrowserRouter>
   <NavBar/>

    <Routes>
      <Route path="/" element={<Home/>} />
      {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App