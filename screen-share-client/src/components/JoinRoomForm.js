import React, { useState } from 'react';
import socket from '../socket'; // Import socket
import { TextField, Button, Box } from '@mui/material'; // Import Material-UI components

const JoinRoomForm = ({ onJoin }) => {
  const [roomName, setRoomName] = useState('default-room'); // Setting default roomName
  const [username, setUsername] = useState('User'); // Setting default username

  const handleJoin = () => {
    if (roomName.trim() !== '' && username.trim() !== '') {
      socket.emit('joinRoom', { room: roomName, username });
      onJoin(roomName, username); // Callback to handle state change in parent component
    }
  };

  return (
    <Box sx={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      <TextField
        label="Enter Room Name"
        variant="outlined"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        sx={{ width: '300px' }} // Adjust width as needed
      />
      <TextField
        label="Enter Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ width: '300px' }} // Adjust width as needed
      />
      <Button variant="contained" onClick={handleJoin} disabled={!roomName.trim() || !username.trim()}>
        Join Room
      </Button>
    </Box>
  );
};

export default JoinRoomForm;
