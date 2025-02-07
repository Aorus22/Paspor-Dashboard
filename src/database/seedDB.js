import { getAllDataNames } from '../constants/menu.js';
import db from './database.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

const dataNames = getAllDataNames();

const totalInserts = dataNames.length * months.length;
let completed = 0;

function checkClose() {
  completed++;
  if (completed === totalInserts) {
    db.close((err) => {
      if (err) {
        console.error('Error menutup koneksi database:', err.message);
      } else {
        console.log('Semua data berhasil di-seed dan koneksi database ditutup.');
      }
    });
  }
}

dataNames.forEach((tableName) => {
  months.forEach((month) => {
    const total = getRandomInt(1, 100);
    db.run(
      `INSERT INTO ${tableName} (month, total) VALUES (?, ?)`,
      [month, total],
      function (err) {
        if (err) {
          console.error(`Gagal memasukkan data ke tabel ${tableName} untuk bulan ${month}: ${err.message}`);
        } else {
          console.log(`Data berhasil dimasukkan ke tabel ${tableName} (ID: ${this.lastID}) untuk bulan ${month}`);
        }
        checkClose();
      }
    );
  });
});
