import db from '@/database/database';
import { parse } from 'cookie';

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) {
      return new Response(JSON.stringify({ user: null }), { status: 200 });
    }

    const cookies = parse(cookieHeader);
    const userId = cookies.userId;

    if (!userId) {
      return new Response(JSON.stringify({ user: null }), { status: 200 });
    }

    const getUser = (id) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT id, name, email, role FROM users WHERE id = ?', [id], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    };

    const user = await getUser(userId);

    return new Response(JSON.stringify({ user: user || null }), { status: 200 });
  } catch (error) {
    console.error('User fetch error:', error);
    return new Response(JSON.stringify({ user: null }), { status: 500 });
  }
}
