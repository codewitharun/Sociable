import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import swagger from "./swagger.js";
import userRoutes from "./routes/userRoutes.js";
import oasGenerator from "express-oas-generator";
dotenv.config();

const app = express();

oasGenerator.init(app, {});
// swagger(app);
app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGODB_CREDENTIALS;
console.log(mongoURI);
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World, from Arun");
});

app.listen(3001, () => {
  console.log("Server started");
});
