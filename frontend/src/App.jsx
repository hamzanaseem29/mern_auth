/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "../RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRouter = ({element}) => {
    return isAuthenticated ? element : <Navigate to={'/login'} />
  }
  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to={'/login'}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRouter element={<Home />} />} />
      </Routes>
    </> 
  );
}

export default App;
