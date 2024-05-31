// controllers/postController.js
const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const authorId = req.user.userId; // Assuming req.user is set by the authentication middleware

    // Validate input
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Create a new post in the database
    await Post.create({ title, description, authorId });
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
};


const getPosts = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const posts = await Post.findByAuthorId(authorId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const authorId = req.user.userId;
    const post = await Post.findById(id, authorId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await Post.update(id, { title, description });
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.userId;
    const post = await Post.findById(id, authorId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await Post.delete(id, authorId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
