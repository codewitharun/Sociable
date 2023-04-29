import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
let tokenLocal = "";
mongoose
  .connect(
    "mongodb+srv://Arun:Arun.kumar@sociable.xpdhixm.mongodb.net/Sociable?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

app.get("/", (req, res) => {
  res.send("Hello World, from Arun");
});

let users = ["arun"];

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;

    // Check if email already exists in the database
    const existingUser = await UserDB.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in the database with hashed password
    const user = new UserDB({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
    });
    await user.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserDB.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await UserDB.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/login", async (req, res) => {
  const { email, password, deviceToken } = req.body;
  try {
    // Check if user exists
    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    user.loggedInDevices = [];
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.loggedInDevices.push(token);
    await user.save();
    tokenLocal = token;
    // Add new device token to loggedInDevices array
    // console.log(tokenLocal);
    return res.json({
      token: token,
      email: user.email,
      mobile: user.mobileNumber,
      userID: user._id,
    });
    // res.send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/logout", async (req, res) => {
  const { email, deviceToken } = req.body;
  try {
    // Find user by ID
    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Remove device token from loggedInDevices array
    user.loggedInDevices = user.loggedInDevices.filter(
      (token) => token !== tokenLocal
    );
    await user.save();
    res.send("Logout successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(3001, () => {
  console.log("Server started");
});
