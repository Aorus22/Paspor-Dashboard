"use client";

import Header from "@/components/Header";
import LoadingSpinner from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainPagesLayout({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.user) {
          router.push("/login");
        }
        setUser(data.user);
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <LoadingSpinner overlay/>;
  }

  return (
    <div className="min-h-screen flex overflow-x-hidden max-w-[100vw]">
      <Sidebar />

      <div className={`flex-1 flex flex-col ml-72`}>
        <Header />

        <main className={`mt-20 flex-1 bg-white overflow-hidden`}>
          {children}
        </main>
      </div>
    </div>
  );
}
