const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body});
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => { 
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like/Unlike Post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const likeIndex = post.likes.findIndex(like => like.userId === req.userId);
    if (likeIndex === -1) {
      // Add like
      post.likes.push({ userId: req.userId });
    } else {
      // Remove like
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { text, userId, username } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text is required" });

    post.comments.push({ userId: userId,username,  text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Comment
exports.removeComment = async (req, res) => {
  
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    console.log("ids",post)
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId);
    
    if (commentIndex === -1) return res.status(404).json({ error: "Comment not found" });

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
