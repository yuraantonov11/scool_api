const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

// Create a new post
router.post("/api/posts", postController.createPost);

// Retrieve all posts
router.get("/api/posts", postController.getAllPosts);

// Retrieve all published posts
router.get("/api/posts/published", postController.getAllPublishedPosts);

// Retrieve all posts by a publisher name
router.get("/api/posts/publisher", postController.getAllPostsByPublisherName);

// Retrieve a post by its title
router.get("/api/posts/title/:title", postController.getPostByTitle);

// Retrieve a post by its ID
router.get("/api/posts/:id", postController.getPostById);

// Update a post by its ID
router.put("/api/posts/:id", postController.updatePostById);

// Delete a post by its ID
router.delete("/api/posts/:id", postController.deletePostById);

// Delete all posts
router.delete("/api/posts", postController.deleteAllPosts);

module.exports = router;
