import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(process.cwd(), 'src', 'database', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    // console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  const schemaPath = path.join(process.cwd(), 'src', 'database', 'schema.sql');
  try {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
      if (err) {
        console.error('Error initializing database schema:', err.message);
      } else {
        // console.log('Database schema initialized.');
      }
    });
  } catch (error) {
    console.error('Error reading schema.sql:', error.message);
  }
}

export default db;
