import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //nsjdf
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  loggedInDevices: [String],
  deviceToken: String,
});

const UserDB = mongoose.models.User || mongoose.model("User", userSchema);

export default UserDB;
