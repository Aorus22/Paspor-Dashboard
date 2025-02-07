"use client";

export default function AuthLayout({ children }) {
  return (
    <main className={`bg-gray-100 overflow-auto`}>
      {children}
    </main>
  );
}
