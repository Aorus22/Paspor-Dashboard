import db from '@/database/database';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, password } = await request.json();

    const getUser = (name) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE name = ?', [name], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    };

    const user = await getUser(name);

    if (!user) {
      return new Response(JSON.stringify({ message: 'username atau password salah.' }), { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Email atau password salah.' }), { status: 401 });
    }

    const cookie = `userId=${user.id}; Path=/; HttpOnly`;

    return new Response(JSON.stringify({ message: 'Login berhasil.' }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}
