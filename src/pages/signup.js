import React from 'react';
import google from "../assets/google.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccessLogin = (token) => {
    localStorage.setItem("token", token);
    navigate("/profile");
  };

  const handleGoogleLogin = () => {
    window.open("https://shop-sphere-backend-sigma.vercel.app/api/auth/google", "_self");
    handleSuccessLogin()
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Welcome to ShopSphere</h1>
        <img src={logo} alt="logo" className="login-image" />
        <p className="login-description">Sign in with Google to continue</p>
        <button onClick={handleGoogleLogin} className="google-login-btn">
          <img src={google} alt="Google Logo" className="google-logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
