// src/components/Room.js

import React, { useState } from 'react';
import socket from '../socket';

const Room = ({ onRoomJoined }) => {
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (room.trim() !== '') {
      socket.emit('joinRoom', room);
      onRoomJoined(room);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room name"
        style={{ marginRight: '10px' }}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Room;
