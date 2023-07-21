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
