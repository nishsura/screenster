// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import socket from '../socket'; // Import socket
import { Typography, TextField, Button, Box, Paper, List, ListItem, ListItemText } from '@mui/material'; // Import Material-UI components

const Chat = ({ room, username }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up listener on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const message = { username, text: inputMessage };
      // Emit message to the server, including room and message details
      socket.emit('message', { room, message });
      // Add the message to the local state as well
      setMessages(prevMessages => [...prevMessages, message]);
      setInputMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ p: 2, pb: 0 }}>Chat</Typography>
      <Paper elevation={3} sx={{ flexGrow: 1, overflowY: 'auto', p: 2, mb: 2, display: 'flex', flexDirection: 'column' }}>
        <List sx={{ flexGrow: 1 }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ mb: 1 }}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
                      {msg.username}:
                    </Typography>
                    <Typography component="span" variant="body2">
                      {msg.text}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TextField
          label="Type your message..."
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => { // Allow sending message with Enter key
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          sx={{ flexGrow: 1 }}
          size="small"
        />
        <Button variant="contained" onClick={sendMessage} size="medium">Send</Button>
      </Box>
    </Box>
  );
};

export default Chat;
