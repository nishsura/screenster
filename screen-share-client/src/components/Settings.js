import React, { useState } from 'react';
import axios from 'axios';
import './Settings.css';

const Settings = ({ currentUsername, onUsernameChange, room, toggleSettings }) => {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleUsernameChange = async () => {
    if (newUsername.trim() !== '') {
      onUsernameChange(newUsername);
      const roomUrl = `${window.location.origin}?room=${room}`;

      try {
        const response = await axios.post(`${apiUrl}/api/users`, {
          username: newUsername,
          roomUrl: roomUrl
        });
        console.log('User saved successfully:', response.data); // Log response data
      } catch (error) {
        console.error('Error saving user data:', error); // Log error
      }

      toggleSettings();
    }
  };

  const roomLink = `${window.location.origin}?room=${room}`;

  return (
    <div className="settings-page-container">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-input-container">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter new name"
          className="settings-input"
        />
        <button onClick={handleUsernameChange} className="settings-button">Change Name</button>
      </div>
      <div className="settings-link-container">
        <p>Share this link to invite others to join the room:</p>
        <input
          type="text"
          value={roomLink}
          readOnly
          className="settings-link-input"
        />
      </div>
      <button onClick={toggleSettings} className="settings-button">Close</button>
    </div>
  );
};

export default Settings;
