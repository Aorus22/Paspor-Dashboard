import db from '@/database/database';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { data_name } = await params;

  try {
    const query = `SELECT month, total FROM ${data_name}`;
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error(err);
          return resolve(new NextResponse(JSON.stringify({ message: 'Internal server error.' }), { status: 500 }));
        }
        resolve(new NextResponse(JSON.stringify({ data: rows }), { status: 200 }));
      });
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { data_name } = await params;
  const { month, total } = await request.json();

  try {
    const query = `
      INSERT INTO ${data_name} (month, total)
      VALUES (?, ?)
      ON CONFLICT(month) DO UPDATE SET total = excluded.total
    `;

    return new Promise((resolve) => {
      db.run(query, [month, total], function(err) {
        if (err) {
          console.error(err);
          return resolve(new NextResponse(JSON.stringify({ message: 'Internal server error.' }), { status: 500 }));
        }
        resolve(new NextResponse(JSON.stringify({ message: 'Data inserted/updated successfully.' }), { status: 200 }));
      });
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}