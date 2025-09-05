import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket'; // Import socket
import { Typography, Button, Box, Paper } from '@mui/material'; // Import Material-UI components

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' } // Example STUN server
  ]
};

const ScreenShare = ({ room, username, toggleSettings }) => {
  const [screenStream, setScreenStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Handle starting screen share
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60, displaySurface: "monitor" }, // Specify displaySurface for clarity
        audio: true
      });
      setScreenStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      // Emit event to other users in the room to initiate peer connection
      socket.emit('initiatePeerConnection', { room, sender: username });
    } catch (err) {
      console.error("Error accessing display media: " + err);
    }
  };

  // Initialize Peer Connection and Socket Listeners
  useEffect(() => {
    const pc = new RTCPeerConnection(configuration);

    // Handle adding local stream tracks
    if (screenStream) {
      screenStream.getTracks().forEach(track => pc.addTrack(track, screenStream));
    }

    // Handle receiving remote stream tracks
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
      setRemoteStream(event.streams[0]);
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', { room, candidate: event.candidate, target: 'remote_user_id' }); // 'remote_user_id' needs to be determined
      }
    };

    setPeerConnection(pc);

    // Socket listeners for WebRTC signaling
    socket.on('offer', async ({ offer, sender }) => {
      if (sender !== username) { // Avoid self-connection
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { room, answer, target: sender });
      }
    });

    socket.on('answer', async ({ answer, sender }) => {
      if (sender !== username) { // Avoid self-connection
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on('candidate', async ({ candidate, sender }) => {
      if (sender !== username) { // Avoid self-connection
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // Clean up socket listeners on component unmount
    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('candidate');
      socket.off('initiatePeerConnection');
      if (pc) {
        pc.close();
      }
    };
  }, [screenStream, room, username]); // Dependencies for useEffect

  // Handle starting screen share and setting up peer connection
  useEffect(() => {
    if (screenStream && peerConnection) {
      // Attach stream to local video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
      // Now that stream is added, we can potentially initiate connection if this user is the initiator
      // Or wait for an offer if another user initiates
    }
  }, [screenStream, peerConnection]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', p: 3 }}>
      <Typography variant="h4" gutterBottom>Screen Sharing</Typography>
      <Box sx={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Your Screen</Typography>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '400px', border: '1px solid #ccc' }} />
          {!screenStream && (
            <Button variant="contained" onClick={startScreenShare} sx={{ mt: 2 }}>
              Start Screen Share
            </Button>
          )}
        </Paper>
        {remoteStream && (
          <Paper elevation={3} sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Shared Screen</Typography>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '400px', border: '1px solid #ccc' }} />
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ScreenShare;
