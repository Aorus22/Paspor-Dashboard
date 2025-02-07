import db from './database.js';
import pkg from 'bcryptjs';
const { hash } = pkg;

const addAdmin = () => {
  const name = 'admin';
  const email = 'admin@example.com';
  const password = 'admintikim';
  const role = 'ADMIN';

  hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return console.error('Error hashing password:', err);
    }

    db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            console.log('Admin user sudah ada.');
          } else {
            return console.error('Error inserting admin:', err.message);
          }
        } else {
          console.log(`Admin user ditambahkan dengan ID: ${this.lastID}`);
        }
        db.close();
      }
    );
  });
};

addAdmin();
