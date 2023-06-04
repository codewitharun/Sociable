import express from "express";
import webSchema from "../models/webrtcSchema.js";
import http from "http";
import { Server } from "socket.io";
const router = express.Router();
const server = http.createServer(express());
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle WebRTC signaling events
  socket.on("offer", async (data) => {
    try {
      const createdData = await webSchema.create(data);
      // Emit the created data to all connected sockets
      io.emit("offer", createdData);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("answer", async (data) => {
    try {
      const createdData = await webSchema.create(data);
      // Emit the created data to all connected sockets
      io.emit("answer", createdData);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("candidate", async (data) => {
    try {
      const createdData = await webSchema.create(data);
      // Emit the created data to all connected sockets
      io.emit("candidate", createdData);
    } catch (error) {
      console.error(error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

router.get("/webrtc", async (req, res) => {
  try {
    const data = await webSchema.find();
  
    res.json(io);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/webrtc", async (req, res) => {
  try {
    const newData = req.body;
    const createdData = await webSchema.create(newData);
    res.json(createdData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
const webrtcRoutes = router;
export default webrtcRoutes;