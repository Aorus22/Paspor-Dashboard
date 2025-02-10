"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(data.message);
      setTimeout(() => {
        NProgress.start();
        router.push("/login");
      }, 2000);
    } else {
      setError(data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/background.jpg')", 
      }}
    >
      <div className="bg-blue-400/30 backdrop-blur-md px-16 py-20 rounded-md shadow-md w-full max-w-lg mx-2">
        <div className="mb-16">
          <h2 className="text-3xl text-black font-bold mb-2 text-center">REGISTER</h2>
          <p className="text-center text-gray-200 mb-6">
            Silakan isi form untuk membuat akun baru
          </p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-300 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} >
          {/* Name */}
          <div className="space-y-6 mb-16">
            <div>
              {/* <label className="block mb-1 font-semibold text-white">Username</label> */}
              <input
                placeholder="username"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Email */}
            <div>
              {/* <label className="block mb-1 font-semibold text-white">Email</label> */}
              <input
                placeholder="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Password */}
            <div>
              {/* <label className="block mb-1 font-semibold text-white">Password</label> */}
              <input
                placeholder="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          
          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full bg-[#1f2937] text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Daftar
          </button>
        </form>

        <p className="mt-4 text-center text-gray-200">
          Sudah punya akun?{" "}
          <a href="/login" className="text-white underline hover:text-gray-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
