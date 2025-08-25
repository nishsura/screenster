import React from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, Box } from '@mui/material'; // Import Material-UI components
import './HomePage.css'; // Keep for now, might remove if not needed

const HomePage = ({ onStart }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Screenster
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Welcome to Screenster, a Screen Sharing App where you can share your screen in high resolution at 60 FPS and chat with your friends in real-time. Whether you're collaborating on a project, watching videos together, or conducting a remote meeting, our app provides a seamless experience to keep you connected.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Features include:
      </Typography>
      <List sx={{ mb: 3, display: 'inline-block', textAlign: 'left' }}>
        <ListItem>
          <ListItemText primary="High-resolution screen sharing at 60 frames per second" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Real-time text chat to communicate with your friends" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Simple and intuitive user interface" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Room-based system to create and join specific sessions" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Cross-platform support, so you can connect from any device" />
        </ListItem>
      </List>
      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Developed by Nish Sura. This app aims to bring people closer by providing a reliable and high-quality screen sharing experience. Join a room, share your screen, and start chatting today!
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={onStart} sx={{ px: 4, py: 1.5 }}>
        Get Started
      </Button>
    </Container>
  );
};

export default HomePage;
