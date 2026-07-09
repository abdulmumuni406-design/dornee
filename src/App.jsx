import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/contact'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/contact" element={<Contact />} /> 
    </Routes>
    </>
  )
}

export default App