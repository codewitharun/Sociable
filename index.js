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
let speed = "";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connection with database established"),
      (speed = "connected to Mongoose");
  })
  .catch((error) => {console.log("Could not connect to MongoDB", error)
  (speed = "failed to connect to mongoose",process.env.mongoURI);});

app.use("/api", userRoutes);
app.get("/", (req, res) => {
  const html = `
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World, from Arun</h1>
        <p>Hello ${speed}</p>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(3001, () => {
  console.log("Server started");
});
