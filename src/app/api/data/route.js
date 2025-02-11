import { getAllDataNames } from '@/constants/menu';
import db from '@/database/database';
import { NextResponse } from 'next/server';

const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export async function GET() {
  try {
    const dataNames = getAllDataNames();
    const allData = {};

    await Promise.all(
      dataNames.map(async (dataName) => {
        const query = `SELECT month, total FROM ${dataName}`;
        const result = await queryDatabase(query);
        allData[dataName] = result;
      })
    );

    return NextResponse.json({ ...allData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching all data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}