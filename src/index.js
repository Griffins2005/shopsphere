import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <GoogleOAuthProvider clientId="533760557307-7lm98vo04v0b915h2na1snh7t99vcvda.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
