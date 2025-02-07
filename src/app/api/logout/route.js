export async function POST(request) {
  try {
    const cookie = `userId=; Path=/; HttpOnly; Max-Age=0`;

    return new Response(JSON.stringify({ message: 'Logout berhasil.' }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}
