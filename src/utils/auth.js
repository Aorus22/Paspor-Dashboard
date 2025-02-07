// src/utils/auth.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'test'; // Pastikan ini diatur di .env

// Fungsi untuk menandatangani JWT token
const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

// Fungsi untuk memverifikasi dan mendekode JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Mengandung informasi pengguna
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
