# ScreenApp: High-Resolution Screen Sharing App

## Overview

ScreenApp is a high-resolution screen-sharing application designed to facilitate real-time collaboration, video watching, and remote meetings. It offers seamless screen sharing at 60 FPS along with a real-time text chat feature. The application leverages modern web technologies, including React for the front-end, Node.js for the back-end, and MongoDB for data storage.

## Features

- **High-Resolution Screen Sharing**: Share your screen at 60 frames per second for a smooth and clear experience.
- **Real-Time Chat**: Communicate with other users in the room using the built-in chat feature.
- **Room-Based System**: Create and join specific rooms for different sessions.
- **User Settings**: Customize your username and generate invite links to share with others.
- **Cross-Platform Support**: Accessible from any device with a web browser.

## Technologies Used

### Front-End

- **React**: A JavaScript library for building user interfaces. It allows for the creation of reusable UI components and manages the application's state efficiently.
- **CSS**: For styling the components and creating a dark theme for the user interface.
- **Vercel**: Used for deploying the front-end. It provides seamless integration with GitHub and automated deployments.

### Back-End

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine. It allows for server-side scripting and is used to build the back-end of the application.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
- **Socket.io**: Enables real-time, bidirectional, and event-based communication. It's used for the screen sharing and chat functionalities.
- **MongoDB**: A NoSQL database used to store information about users and rooms. MongoDB is chosen for its scalability and flexibility in handling different types of data.

### Deployment

- **AWS EC2**: Used for deploying the back-end server. EC2 provides scalable compute capacity in the cloud.
- **Vercel**: Used for deploying the front-end. It provides automatic HTTPS, DDoS protection, and a simple deployment process.

## How It Works

### Front-End

The front-end of the application is built using React. It consists of several components, each responsible for different parts of the application:

- **HomePage**: The landing page of the application that provides an overview and a "Get Started" button.
- **ScreenSharePage**: The main screen sharing interface where users can share their screen and chat with others in the room.
- **Settings**: A settings page where users can change their username and generate invite links.

When a user navigates to the ScreenSharePage, they can initiate screen sharing by clicking a button. The screen sharing functionality is implemented using the WebRTC API, which allows for real-time communication. The chat functionality uses Socket.io to enable real-time messaging.

### Back-End

The back-end is built using Node.js and Express.js. It handles the following:

- **API Endpoints**: Provides endpoints for updating user information and managing rooms.
- **Socket.io Server**: Manages real-time communication between clients for screen sharing and chat.
- **MongoDB Integration**: Stores information about users and rooms. When a user updates their username, the change is saved in the MongoDB database.

### Database

MongoDB is used to store the following data:

- **Users**: Information about users, including their usernames and the rooms they are part of.
- **Rooms**: Information about active rooms and the users connected to each room.

Data is stored in a flexible JSON-like format, allowing for easy updates and retrieval. MongoDB's scalability ensures that the application can handle a growing number of users and rooms.

## Deployment Instructions

### Deploying the Back-End on AWS EC2

1. **Create an EC2 Instance**:
   - Launch an EC2 instance using the Ubuntu Server 20.04 LTS AMI.
   - Connect to your instance via SSH and install necessary dependencies (Node.js, npm, MongoDB).
   - Clone your backend repository, install dependencies, and start the server.

2. **Set Up Nginx as a Reverse Proxy**:
   - Install Nginx and configure it to proxy requests to your Node.js application running on port 3000.

### Deploying the Front-End on Vercel

1. **Sign Up / Sign In to Vercel**:
   - Create a new project on Vercel and connect it to your frontend GitHub repository.

2. **Configure Environment Variables**:
   - Add `REACT_APP_API_URL` environment variable pointing to your EC2 instance's public URL.

3. **Deploy Your Front-End**:
   - Deploy your project on Vercel. Vercel will automatically build and deploy your React application.

## How to Use

1. **Visit the Application**:
   - Navigate to the deployed front-end URL.

2. **Start a Session**:
   - On the HomePage, click "Get Started" to go to the ScreenSharePage.

3. **Share Your Screen**:
   - Click the button to start screen sharing. Allow the browser to capture your screen.

4. **Chat with Others**:
   - Use the chat interface to communicate with others in the room.

5. **Settings**:
   - Click the "Settings" button to change your username and generate an invite link.

## Conclusion

ScreenApp is a powerful and user-friendly screen-sharing application designed for high-resolution sharing and real-time communication. By leveraging modern web technologies and deployment platforms, it provides a seamless experience for users to collaborate, watch videos, and conduct remote meetings. The use of MongoDB ensures scalable and flexible data storage, making the application robust and efficient.

Developed by Nish Sura, ScreenApp aims to bring people closer by providing a reliable and high-quality screen-sharing experience. Feel free to explore, share your screen, and connect with others seamlessly.
