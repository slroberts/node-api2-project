const express = require("express");
const router = express.Router();
const Posts = require("../data/db.js");

router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database.",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  Post.insertComment({text: req.body.text, post_id: req.params.id})
    .then((comment) => {
      res.status(201).json(comment);

      if (!comment.text) {
        res
          .status(400)
          .json({errorMessage: "Please provide text for the comment."});
      } else if (!req.params.id) {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database.",
      });
    });
});

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({error: "The post information could not be retrieved."});
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({error: "The comments information could not be retrieved."});
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({message: "The post has been nuked"});
      } else {
        res
          .status(400)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  Posts.update(req.params.id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else if (!req.title || !req.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});

module.exports = router;
