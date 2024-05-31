// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/posts', authenticate, createPost);
router.get('/posts', authenticate, getPosts);
router.put('/posts/:id', authenticate, updatePost);
router.delete('/posts/:id', authenticate, deletePost);

module.exports = router;
