// models/postModel.js
const db = require('../config/db');

const Post = {
  create: async (post) => {
    const { title, description, authorId, date } = post;
    const [result] = await db.query('INSERT INTO posts (title, description, author_id) VALUES (?, ?, ?)', [title, description, authorId]);
    return result;
  },
  findByAuthorId: async (authorId) => {
    const [rows] = await db.query('SELECT * FROM posts WHERE author_id = ?', [authorId]);
    return rows;
  },
  findById: async (id, authorId) => {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ? AND author_id = ?', [id, authorId]);
    return rows[0];
  },
  update: async (id, post) => {
    const { title, description } = post;
    const [result] = await db.query('UPDATE posts SET title = ?, description = ? WHERE id = ?', [title, description, id]);
    return result;
  },
  delete: async (id, authorId) => {
    const [result] = await db.query('DELETE FROM posts WHERE id = ? AND author_id = ?', [id, authorId]);
    return result;
  }
};

module.exports = Post;
