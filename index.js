import express from "express";
const app = express();
console.log("Server started");
app.get("/", (req, res) => {
  res.send("<h1>Hi testing my first backend code</h1>");
});

app.post("/user", (req, res) => {
  //   req.body.user = "test";
  //   req.body.username = "test";
  req.send("<h1>Hi testing my first backend code</h1>");
  //   res.sendDate(new Date());
  //   console.log(req, res);
});

app.listen(3000);
