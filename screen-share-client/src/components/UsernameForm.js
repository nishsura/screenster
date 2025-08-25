// src/components/UsernameForm.js

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material'; // Import Material-UI components

const UsernameForm = ({ onUsernameSet }) => {
  const [username, setUsername] = useState('');

  const handleSetUsername = () => {
    if (username.trim() !== '') {
      onUsernameSet(username);
    }
  };

  return (
    <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Enter your name"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginRight: '10px', flexGrow: 1 }}
      />
      <Button variant="contained" onClick={handleSetUsername} disabled={!username.trim()}>
        Set Name
      </Button>
    </Box>
  );
};

export default UsernameForm;
