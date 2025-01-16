import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailLogin = async () => {
    try {
      const response = await axios.post('https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev/api/auth/login', { email, password });
      console.log('Login successful:', response.data);
      
      // Store JWT token (can be stored in localStorage or sessionStorage)
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the default page
      navigate('/');
    } catch (error) {
      console.error('Email login failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post('https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev/api/auth/google-login', {
        token: credentialResponse.credential,
      });
      console.log('Google login successful:', response.data);
      
      // Store JWT token
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the default page 
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during Google login.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => setError('Google login failed. Please try again.')}
      />
      <div className="email-login">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;