require("dotenv/config");
const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

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
