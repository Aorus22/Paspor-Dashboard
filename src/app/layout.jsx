"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext"; 
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader showSpinner={false} />
        <ToastContainer 
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          theme="dark"
        />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
