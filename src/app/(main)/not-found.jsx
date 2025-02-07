// not-found.jsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
