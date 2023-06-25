import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

import userRoutes from "./routes/userRoutes.js";
import VideoRoute from "./routes/webrtcRoutes.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_CREDENTIALS;
console.log(mongoURI);
let speed = "";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection with database established");
    speed = "connected to Mongoose";
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB", error);
    speed = "failed to connect to Mongoose";
  });

io.on("connection", (socket) => {
  socket.on("joinSession", ({ user, roomId }) => {
    socket.join(roomId); // Join the specified room
    socket.username = user; // Assign a username to the socket if needed
    // Additional code for handling the session
  });

  socket.on("offer", (data) => {
    const { offer, roomId } = data;
    socket.to(roomId).emit("incomingOffer", { offer, socketId: socket.id });
  });

  socket.on("answer", (data) => {
    const { answer, socketId } = data;
    socket.to(socketId).emit("incomingAnswer", { answer, socketId: socket.id });
  });

  socket.on("iceCandidate", (data) => {
    const { candidate, socketId } = data;
    socket
      .to(socketId)
      .emit("incomingIceCandidate", { candidate, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    const roomId = Object.keys(socket.rooms)[1]; // Get the room ID of the socket
    socket.to(roomId).emit("userDisconnected", socket.id);
  });
});

app.use("/api", userRoutes);
app.use("/api/", VideoRoute);

app.get("/", (req, res) => {
  res.sendFile("users.htm", { root: "./" });
});

server.listen(3001, () => {
  console.log("Server started on port 3001");
});
