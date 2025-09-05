// src/App.js

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import for transitions
import HomePage from './components/HomePage';
import ScreenSharePage from './components/ScreenSharePage';
import Settings from './components/Settings';
import socket from './socket';
import theme from './theme';
import './App.css'; // Import CSS for transitions
import { Box } from '@mui/material'; // Import Box from MUI

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [started, setStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      setRoom(roomParam);
      setStarted(true); // Automatically start if room is in URL
    }
  }, []);

  useEffect(() => {
    if (started && username && room) {
      socket.emit('joinRoom', { room, username });
    }
  }, [started, room, username]);

  const handleUsernameInput = (newUsername) => {
    setUsername(newUsername);
  };

  const handleRoomInput = (newRoom) => {
    setRoom(newRoom);
  };

  const handleStartApp = () => {
    setStarted(true);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleUsernameChangeFromSettings = (newUsername) => {
    setUsername(newUsername);
  };

  // Determine which component to render based on state
  const renderCurrentComponent = () => {
    if (!started) {
      return (
        <HomePage
          onStart={handleStartApp}
          onUsernameInput={handleUsernameInput}
          onRoomInput={handleRoomInput}
          username={username}
          room={room}
        />
      );
    } else {
      if (!showSettings) {
        return (
          <ScreenSharePage
            room={room}
            username={username}
            toggleSettings={toggleSettings}
          />
        );
      } else {
        return (
          <Settings
            currentUsername={username}
            onUsernameChange={handleUsernameChangeFromSettings}
            room={room}
            toggleSettings={toggleSettings}
          />
        );
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={started + showSettings}
            timeout={300}
            classNames={{
              enter: 'fade-enter',
              enterActive: 'fade-enter-active',
              exit: 'fade-exit',
              exitActive: 'fade-exit-active',
            }}
          >
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {renderCurrentComponent()}
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </ThemeProvider>
  );
};

export default App;
