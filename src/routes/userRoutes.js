import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserDB from "../models/userSchema.js";

dotenv.config();

const router = express.Router();
let deviceTokenLocal = "";
const authenticateToken = (req, res, next) => {
  // console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(" ")[1];
console.log(authHeader)
  if (!authHeader) {
    return res.status(401).send("Missing JWT token");
  }

  jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid JWT token");
    }

    req.user = user;
    next();
  });
};
router.post("/signup", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  if (id) {
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
  } else if (!id) {
    res.status(500).json("userID is required");
  }
});

router.get("/users", authenticateToken, async (req, res) => {
  try {
    
    const users = await UserDB.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
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
    deviceTokenLocal = token;
    // Add new device token to loggedInDevices array
    // console.log(deviceTokenLocal);
    return res.json({
      token: token,
      email: user.email,
      mobile: user.mobileNumber,
      userID: user._id,
      name: user.name,
    });
    // res.send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error", error);
  }
});

router.post("/logout", authenticateToken,async (req, res) => {
  const { email, deviceToken } = req.body;
  try {
    // Find user by ID
    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Remove device token from loggedInDevices array
    user.loggedInDevices = user.loggedInDevices.filter(
      (device) => device !== deviceTokenLocal
    );
    await user.save();
    res.send("Logout successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// module.exports = router;
const userRoutes = router;
export default userRoutes;
