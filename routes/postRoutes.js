const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  removeComment,
} = require("../controllers/postControllers");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Post Routes
router.post("/", verifyToken, createPost); // Create a new post
router.get("/", getPosts); // Get all posts
router.put("/:id", verifyToken, updatePost); // Update a post
router.delete("/:id", verifyToken, deletePost); // Delete a post

// Like/Unlike Post
router.patch("/:id/like", verifyToken, toggleLike); // Like or unlike a post

// Comments
router.post("/:id/comment", verifyToken, addComment); // Add a comment to a post
router.delete("/:id/comment/:commentId", verifyToken, removeComment); // Remove a comment from a post

module.exports = router;
