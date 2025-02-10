"use client";

import React, { useEffect } from "react";

export default function LoadingSpinner({ overlay = false }) {
  useEffect(() => {
    if (overlay) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [overlay]);

  return (
    <>
      <div
        className={`${
          overlay
            ? "fixed inset-0 z-50 flex items-center justify-center bg-[#4a6a96] bg-opacity-50"
            : "flex items-center justify-center"
        }`}
        style={{ height: "100%" }}
      >
        <div className="flex items-center justify-center gap-8">
          <img
            src="/icon/logo1.png" 
            alt="Logo 1"
            className="w-24 h-24 object-contain animate-logo-pulse1"
          />
          <img
            src="/icon/logo2.png"
            alt="Logo 2"
            className="w-24 h-24 object-contain animate-logo-pulse2"
          />
        </div>
      </div>

      <style jsx>{`
        .animate-logo-pulse1 {
          animation: logoPulse1 2s ease-in-out infinite;
          animation-fill-mode: both;
          animation-delay: 0s;
        }
        @keyframes logoPulse1 {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-logo-pulse2 {
          animation: logoPulse2 2s ease-in-out infinite;
          animation-fill-mode: both;
          animation-delay: 0s;
        }
        @keyframes logoPulse2 {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
