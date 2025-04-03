import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { handleError, handleSuccess } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...loginInfo };
    copySignupInfo[name] = value;
    setLoginInfo(copySignupInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if ( !email || !password) {
      handleError("All fields are required!");
    }
    try {
      const url = "http://localhost:8000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { message, success , jwtToken, name,  error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error){
        const details = error?.details[0].message;
        handleError(details);
      } else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
        
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              value={loginInfo.email}
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              value={loginInfo.password}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button className="signup-button">Login</button>
          <p className="login-text">
            Don&apos;t have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
