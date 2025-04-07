// import React from 'react';
// import logo from './logo.svg';
import { Button } from "flowbite-react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/RegisterPage";
import LoginForm from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm/>} ></Route>
      <Route path="/login" element={<LoginForm/>} ></Route>
      <Route path="/" element={<Sidebar/>} ></Route>
    </Routes>
  );
}

export default App;
