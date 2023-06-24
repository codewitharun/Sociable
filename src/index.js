import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import swagger from "./swagger.js";
import { Server as SocketIOServer } from 'socket.io';
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
io.on("connection", (socket) => {
  console.log("New socket connection established");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log("Connected to socket", socket.id);
  });

  socket.on("offer", (data) => {
    io.to(data.roomId).emit("offer", data);
  });

  socket.on("answer", (data) => {
    io.to(data.roomId).emit("answer", data);
  });

  socket.on("iceCandidate", (data) => {
    io.to(data.roomId).emit("iceCandidate", data);
  });

  // Handle other signaling events as needed
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
})
