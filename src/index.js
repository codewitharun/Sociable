import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import swagger from "./swagger.js";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

import userRoutes from "./routes/userRoutes.js";
// import oasGenerator from "express-oas-generator";
import VideoRoute from "./routes/webrtcRoutes.js";
dotenv.config();

const app = express();

// oasGenerator.init(app);
// swagger(app);
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new SocketIOServer(server);
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

// app.use(authenticateToken);
const users = {};

io.on('connection', (socket) => {
  socket.on('createRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    // users[socket.id] = roomId;
    
     users["arun"] = roomId;
     console.log(users["arun"],roomId)
    socket.emit('roomJoined', roomId);
  });

  socket.on('offer', (data) => {
    const { offer, roomId } = data;
    socket.to(roomId).emit('incomingOffer', { offer, socketId: socket.id });
  });

  socket.on('answer', (data) => {
    const { answer, socketId } = data;
    socket.to(socketId).emit('incomingAnswer', { answer, socketId: socket.id });
  });

  socket.on('iceCandidate', (data) => {
    const { candidate, socketId } = data;
    socket.to(socketId).emit('incomingIceCandidate', { candidate, socketId: socket.id });
  });

  socket.on('disconnect', () => {
    const roomId = users[socket.id];
    delete users[socket.id];
    socket.to(roomId).emit('userDisconnected', socket.id);
  });
});

app.use("/api", userRoutes);

app.use("/api/", VideoRoute);

app.get("/", (req, res) => {
  res.sendFile("users.htm", { root: "./" });
});

// app.listen(3001, () => {
//   console.log("Server started");
// });
server.listen(3001, (port) => {
  console.log("Server started", server.address());
});
