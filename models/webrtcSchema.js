import mongoose from "mongoose";

const webrtcSchema = new mongoose.Schema({
  sessionID: {
    type: String,
    required: true,
  },
  initiatorID: {
    type: String,
    required: true,
  },
  receiverID: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  iceCandidates: [
    {
      candidate: {
        type: String,
        required: true,
      },
      sdpMLineIndex: {
        type: Number,
        required: true,
      },
      sdpMid: {
        type: String,
        required: true,
      },
    },
  ],
});
const webSchema =
  mongoose.models.Webrtc || mongoose.model("Webrtc", webrtcSchema);

export default webSchema;
