import express from "express";
import bodyparser from "body-parser";
import session from "cookie-session";

const server = express();
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false }));
server.use(
  session({
    maxAge: 60 * 60 * 60,
    secret: "manuel",
  })
);

const loggedInMiddleware = (req, res, next) => {
  if (req.session.user === "abc") {
    next();
  } else {
    res.redirect("/login");
  }
};

server.get("/", (req, res) => {
  res.send(`<a href="/login">Login</a>`);
});

server.get("/login", (req, res) => {
  if (req.session.user == "abc") {
    res.redirect("/admin");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

server.get("/admin", loggedInMiddleware, (req, res) => {
  res.send("Hello admin!");
});

server.get("/users", loggedInMiddleware, (req, res) => {
  res.send("Users list");
});

server.post("/login", (req, res) => {
  if (req.body.user === "abc" && req.body.password === "1234") {
    req.session.user = req.body.user;
    res.redirect("/admin");
  } else {
    res.send("Goodbye");
  }
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
