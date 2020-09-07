const express = require("express");
const postsRouter = require("./blog/posts-router");
// const commentsRouter = require("./blog/comments-router");

const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());
server.use("/api/post", postsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Blog Post API</h2>
  `);
});

module.exports = server;
