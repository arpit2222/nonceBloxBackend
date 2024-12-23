const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true }, // Added username of the author
  createdAt: { type: Date, default: Date.now },
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the commenter
      username: { type: String, required: true }, // Username of the commenter
      text: { type: String, required: true }, // Comment text
      createdAt: { type: Date, default: Date.now }, // Timestamp for the comment
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
