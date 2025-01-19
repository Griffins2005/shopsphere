import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import googleLogo from '../assets/google.png';
import { Navigate } from 'react-router-dom';
import Navbar from "../components/navbar"
import Banner from "../components/banner"
import Footer from "../components/footer"

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const googleSignInRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', form, { withCredentials: true });
      alert(response.data.message || "Signup successful");
      setForm({ name: '', email: '', password: '' });
      setRedirect(true);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', form, { withCredentials: true });
      alert(response.data.message || "Login successful");
      setForm({ name: '', email: '', password: '' });
      setRedirect(true);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5001/api/auth/google", "_self");
  };

  useEffect(() => {
    const googleSignInButton = googleSignInRef.current;
    if (googleSignInButton) {
      googleSignInButton.addEventListener('click', handleGoogleLogin);
    }
    return () => {
      if (googleSignInButton) {
        googleSignInButton.removeEventListener('click', handleGoogleLogin);
      }
    };
  }, []);

  if (redirect) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div>
      <Banner />
      <Navbar />
    <div className="signup-container">
      <h2 className="header">Signup</h2>
      <form className="inputs">
        <div className="input">
          <FontAwesomeIcon className="input-icon" icon={faUser} />
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="input">
          <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input">
          <FontAwesomeIcon className="input-icon" icon={faLock} />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="submit-container">
        <button className="submit" onClick={handleSignup}>Signup</button>
        <button className="submit" onClick={handleLogin}>Login</button>
      </div>
      <div className="separator">
        <hr className="line" />
        <span>or</span>
        <hr className="line" />
      </div>
      <div ref={googleSignInRef} onClick={handleGoogleLogin} className="google-signin">
        <img src={googleLogo} alt="Google Logo" className="google-logo" />
        Login with Google
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Signup;