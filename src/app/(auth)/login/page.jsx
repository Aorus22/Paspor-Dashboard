"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import NProgress from "nprogress";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const { refetchUser } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      refetchUser();
      NProgress.start();
      router.push("/");
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
          <h2 className="text-3xl text-black font-bold mb-2 text-center">LOGIN</h2>
          <p className="text-center text-gray-200 mb-6">
            Isi form sesuai dengan akun yang telah dibuat
          </p>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
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
          
          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-[#1f2937] text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Masuk
          </button>
        </form>

        <p className="mt-4 text-center text-gray-200">
          Belum memiliki akun?{" "}
          <a href="/register" className="text-white underline hover:text-gray-300">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}
