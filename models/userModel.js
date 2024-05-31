// models/userModel.js
const db = require('../config/db');

const User = {
  create: async (user) => {
    const { username, password } = user;
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return result;
  },
  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }
};

module.exports = User;
