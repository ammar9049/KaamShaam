import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Section1 from './components/Section1/Section1';
import Section2 from './components/Section2/Section2';
import Section3 from './components/Section3/Section3';
import Section4 from './components/Section4/Section4';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Footer />
          </>
        } />

        {/* Admin login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin protected route */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
