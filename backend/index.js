import dotenv from "dotenv";
import express from "express";
import http from "http";
import { WebSocket } from "ws";
import mongoose from "mongoose";
import cors from "cors";
import Message from "./models/Message.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://chat-6qzjltjsw-saharshpand3ys-projects.vercel.app/",
  })
);
app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map();

const broadcastUsers = () => {
  const users = Array.from(clients.values());
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "users",
          users: users,
        })
      );
    }
  });
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (data) => {
    const message = JSON.parse(data);
    if (message.type === "join") {
      clients.set(ws, message.username);
      broadcastUsers();
      Message.find()
        .sort({ timestamp: 1 })
        .then((messages) => {
          ws.send(
            JSON.stringify({
              type: "history",
              messages: messages.map((msg) => ({
                username: msg.username,
                content: msg.content,
                timestamp: msg.timestamp.getTime(),
              })),
            })
          );
        });
    } else if (message.type === "message") {
      const username = clients.get(ws);
      const content = message.content;
      const newMessage = new Message({ username, content });

      newMessage.save().then(() => {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "message",
                message: {
                  username,
                  content,
                  timestamp: newMessage.timestamp.getTime(),
                },
              })
            );
          }
        });
      });
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    broadcastUsers();
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
