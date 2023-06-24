import mongoose from 'mongoose';

const videoCallSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const VideoCall = mongoose.model('VideoCall', videoCallSchema);

export default VideoCall;
