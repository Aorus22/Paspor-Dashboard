// src/utils/user.js

const db = require('../database/database').default;
const bcrypt = require('bcrypt');

// Function to create a new user
const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.run(query, [name, email, hash], function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, name, email });
          }
        });
      }
    });
  });
};

// Function to find a user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
