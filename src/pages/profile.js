import React, { useState } from 'react';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { fullName, profilePicture });
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Profile Picture URL"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
