// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/RegisterPage";
import LoginForm from "./pages/LoginPage";
import StudentSidebar from "./pages/StudentSidebar";
import JobListing from './pages/Joblisting';
import Profile from './pages/profile';

import StudentApplications from './pages/StudentPages/StudentApplications';
import SingleJob from './pages/SingleJob';
import StudentDashboard from './pages/RecruiterDashboard';
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm/>} ></Route>
      <Route path="/login" element={<LoginForm/>} ></Route>
      <Route path="/studentDashboard" element={<StudentDashboard/>} ></Route>
      <Route path='/listings' element={<JobListing/>} />
      <Route path='/job/:id' element={<SingleJob/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/my-applications' element={<StudentApplications/>} />
    </Routes>
  );
}

export default App;

