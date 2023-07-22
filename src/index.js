require("dotenv/config");
const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

const { fakeDB } = require("./fakeDB.js");

const server = express();

// use express middleware for easier cookie handling

server.use(cookieparser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Needed to be able to send body data

server.use(express.json()); // to support JSON-encoded bodies

server.use(express.urlencoded({ extended: true })); // support url-encoded body

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

// 1. Register a user

server.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. check if user exist
    const user = fakeDB.find((user) => user.email === email);
    if (user) throw new Error("User already exist");
    // 2. If not user exist, hash the password
    const hashedPassword = await hash(password, 10);
    // 3. Insert the user in "database"
    fakeDB.push({
      id: fakeDB.length,
      email,
      password: hashedPassword,
    });
    res.send({ message: "User Created" });
    console.log(fakeDB);
  } catch (error) {
    res.send({
      error: `${error.message}`,
    });
  }
});

// login a user

server.listen("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in database, If not exits send error
    const user = fakeDB.find((user) => user.email === email);
    if (!user) throw new Error("User does not exist");

    // Compare encrypted password and see if it
    //checks outerHeight, Send errors if not

    const valid = await compare(password, user.password);
    if (!valid) throw new Error("password not correct");
  } catch (error) {}
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
