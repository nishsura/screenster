import React from 'react';
import ScreenShare from './ScreenShare';
import Chat from './Chat';
import './ScreenSharePage.css';

const ScreenSharePage = ({ room, username, toggleSettings }) => {
  return (
    <div className="screen-share-page">
      <div className="settings-button-container">
        <button onClick={toggleSettings} className="settings-button">Settings</button>
      </div>
      <div className="screen-share-container">
        <ScreenShare />
      </div>
      <div className="chat-container">
        <Chat room={room} username={username} />
      </div>
    </div>
  );
};

export default ScreenSharePage;
