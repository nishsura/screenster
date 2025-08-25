// src/App.js

import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ScreenSharePage from './components/ScreenSharePage';
import Settings from './components/Settings';
import UsernameForm from './components/UsernameForm'; // Import UsernameForm
import JoinRoomForm from './components/JoinRoomForm'; // Import JoinRoomForm
import socket from './socket';

const App = () => {
  const [username, setUsername] = useState(''); // Initialize with empty
  const [room, setRoom] = useState('');       // Initialize with empty
  const [started, setStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false); // New state for onboarding completion

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      setRoom(roomParam);
      setIsSetupComplete(true); // If room is in URL, assume setup is complete
    }
  }, []);

  useEffect(() => {
    if (started && username && room) { // Only emit if all are set
      socket.emit('joinRoom', { room, username }); // Emit room and username
    }
  }, [started, room, username]);

  // Handlers for onboarding forms
  const handleUsernameInput = (newUsername) => {
    setUsername(newUsername);
  };

  const handleRoomInput = (newRoom) => {
    setRoom(newRoom);
  };

  const handleProceedToApp = () => {
    if (username && room) { // Ensure both are set before proceeding
      setIsSetupComplete(true);
    }
  };

  // Handler for the "Get Started" button on HomePage
  const handleStartApp = () => {
    setStarted(true);
  };

  // Handler for toggling settings
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Handler for changing username from Settings (updates the main username state)
  const handleUsernameChangeFromSettings = (newUsername) => {
    setUsername(newUsername);
    // Optionally, you might want to emit an update event to the server here
    // socket.emit('updateUsername', { room, oldUsername: username, newUsername });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {!started ? (
        !isSetupComplete ? (
          // Onboarding screen with forms
          <div>
            <UsernameForm onUsernameSet={handleUsernameInput} />
            <JoinRoomForm onJoin={handleRoomInput} />
            <button onClick={handleProceedToApp} disabled={!username || !room}>
              Proceed to App
            </button>
          </div>
        ) : (
          // HomePage after setup is complete, waiting for user to start
          <HomePage onStart={handleStartApp} />
        )
      ) : !showSettings ? (
        // Main screen sharing view
        <ScreenSharePage
          room={room}
          username={username}
          toggleSettings={toggleSettings}
        />
      ) : (
        // Settings view
        <Settings
          currentUsername={username}
          onUsernameChange={handleUsernameChangeFromSettings}
          room={room}
          toggleSettings={toggleSettings}
        />
      )}
    </div>
  );
};

export default App;
