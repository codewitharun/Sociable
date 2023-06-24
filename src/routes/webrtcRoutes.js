import VideoCall from "../models/webrtcSchema.js"; // Import the VideoCall model
import express from "express";
const router = express.Router();
// Create a new video call session
router.post("/videocalls", async (req, res) => {
  try {
    const { roomId, participants } = req.body;
    const videoCall = await VideoCall.create({ roomId, participants });
    res.status(201).json(videoCall);
  } catch (error) {
    res.status(500).json({ error: "Failed to create video call session" });
  }
});

// Retrieve existing video call sessions
router.get("/videocalls", async (req, res) => {
  try {
    const videoCalls = await VideoCall.find().populate("participants");
    res.json(videoCalls);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve video call sessions" });
  }
});
const VideoRoute = router;
export default VideoRoute;
