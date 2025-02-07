import React from 'react';
import google from "../assets/google.png";
import logo from "../assets/logo.png";

const Login = () => {
  const handleGoogleLogin = () => {
    window.open("https://shopsphere-backend-app.vercel.app/api/auth/google", "_self");
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
