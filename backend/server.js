const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from the frontend
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import Server from socket.io

// Start server
const server = http.createServer(app); // Create an HTTP server using the Express app

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // Allow requests from the frontend
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ room, username }) => {
    console.log(`User ${username} joined room: ${room}`);
    socket.join(room);
    // Broadcast to others in the room that a new user has joined
    socket.to(room).emit('userJoined', { username: 'System', text: `${username} has joined the room.` });
  });

  socket.on('message', ({ room, message }) => {
    console.log(`Message in room ${room}: ${message.username}: ${message.text}`);
    // Broadcast message to all clients in the room except the sender
    socket.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Potentially handle user leaving a room here
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
