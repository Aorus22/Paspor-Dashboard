import db from '@/database/database';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUser = (name, email, hashedPassword) => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          function(err) {
            if (err) {
              return reject(err);
            }
            resolve(this.lastID);
          }
        );
      });
    };

    await insertUser(name, email, hashedPassword);

    return new Response(JSON.stringify({ message: 'Registrasi berhasil.' }), { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ message: 'Email sudah digunakan.' }), { status: 400 });
    }
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}
