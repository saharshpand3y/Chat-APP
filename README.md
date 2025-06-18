# Real-Time Chat Application (MERN Stack)

This is a real-time chat application built with MongoDB, Express.js, React.js, and Node.js. It uses WebSockets for real-time communication.

## Features

- Real-time messaging
- Multiple users in a shared chatroom
- Message history upon login

## Prerequisites

- Node.js and npm (or Bun)
- MongoDB (local or cloud)

## Local Setup

### Backend

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following:

     MONGODB_URI=mongodb://localhost:27017/chatdb

     PORT=5000

4. Start the server: `node index.js` or `npm start` (Change Script in package.json accordingly)

The backend will run on ws://localhost:5000.
Check Status of Backend with a curl request to http://localhost:5000/status

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React app: `npm run dev`

The frontend will run on http://localhost:5173.

## Deployment

### Backend

Deploy the backend to a platform like Heroku or Render. Set the environment variables:

- `MONGODB_URI`: Your MongoDB connection string (for cloud database)
- `PORT`: (usually provided by the platform)

### Frontend

Deploy the frontend to Netlify or Vercel. Set the environment variable:

- `VITE_WS_URL`: The WebSocket URL of your deployed backend (e.g., `wss://your-backend-url`)

## Architecture

- **Backend**: Node.js with Express and WebSocket (ws module). Handles WebSocket connections and stores messages in MongoDB.
- **Frontend**: React.js. Uses the browser's WebSocket API to connect to the backend and send/receive messages.

Concurrency is handled by Node.js's event-driven, non-blocking I/O model. Each WebSocket connection is handled asynchronously.

## Assumptions and Design Choices

- We assume that the username is provided once at login and does not change during the session.
- We store messages in MongoDB with a timestamp.
- We retrieve the last 50 messages when a user logs in.

## Accessing the Deployed Application

The deployed frontend URL will be provided by the hosting platform (Netlify/Vercel). Open that URL in a browser to use the chat.

## Testing

You may Test the Application by Accessing [This Link](https://chat-app-beta-flax-83.vercel.app/)
