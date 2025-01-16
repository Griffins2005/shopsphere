import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailSignup = async () => {
    try {
      // Send signup request to the backend
      const response = await axios.post('https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev/api/auth/signup', { email, password });
      console.log('Signup successful:', response.data);
      
      // Redirect to profile page after successful signup
      navigate('/profile');
    } catch (error) {
      console.error('Email signup failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during signup.');
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      // Send Google token to backend for signup
      const response = await axios.post('https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev/api/auth/google-signup', {
        token: credentialResponse.credential,
      });
      console.log('Google signup successful:', response.data);
      
      // Redirect to profile page after successful Google signup
      navigate('/profile');
    } catch (error) {
      console.error('Google signup failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during Google signup.');
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <GoogleLogin
        onSuccess={handleGoogleSignup}
        onError={() => setError('Google signup failed. Please try again.')}
      />
      <div className="email-signup">
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
        <button onClick={handleEmailSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;