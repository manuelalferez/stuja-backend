// this is express
const get = (endpoint, middleware, handler) => {
  const req = { user: "abcd" }; // fake req
  const res = "response"; // fake res
  middleware(req, res, handler);
};

// this is loginMiddleware
const loginMiddleware = (req, res, next) => {
  if (req.user === "abc") {
    next(req, res);
  } else {
    console.log("goodbye"); // res.send("goodbye")
  }
};

// this is admin route
// const adminRoute = (req, res) => {
//   console.log("hello admin");
// };
// This is server.get
// get("/admin", loginMiddleware, adminRoute);

// this server.get (with lambda function)
get("/admin", loginMiddleware, (req, res) => {
  console.log("hello admin"); // res.send("Hello admin")
});
