import "./App.css";
import Dashboard from "./pages/Dashboard";
import { LoginForm } from "./pages/LoginForm";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/login" Component={LoginForm} />
      <Route path="/register" Component={RegisterForm} />
    </Routes>
  );
}

export default App;
