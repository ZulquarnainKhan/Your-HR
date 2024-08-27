import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './../App';
import Login from '../pages/login';
import Signup from '../pages/signup';
import UploadResume from '../pages/UploadResume' ;

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload-resume" element={<UploadResume />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
