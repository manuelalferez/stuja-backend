import express from "express";
import bodyparser from "body-parser";

const server = express();
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false }));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.post("/", (req, res) => {
  if (req.body.user === "abc" && req.body.password === "1234") {
    res.send("Hello admin");
  } else {
    res.send("Goodbye");
  }
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
