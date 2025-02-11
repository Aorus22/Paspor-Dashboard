"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  column1Items,
  column2Items,
  column3Items,
} from "@/constants/dashboardLinks";

export default function DashboardPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const renderColumn = (items, startIndex) => {
    return (
      <div className="flex flex-col gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const globalIndex = startIndex + idx;
          const delay = globalIndex * 75; 

          return (
              <Link
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: item.bg,
                }}
                className={`
                  rounded-lg shadow w-80 p-4 py-10 text-white
                  cursor-pointer
                  hover:opacity-90
                  ${showContent ? "delay-["+delay+"ms]" : "delay-0"}
                  transition-all duration-700
                  opacity-0 scale-95 translate-y-2
                  ${showContent ? "opacity-100 scale-100 translate-y-0" : ""}
                `}
              >
              <div className="flex items-center justify-center gap-3">
                <Icon className="text-2xl shrink-0" />
                <span className="text-lg font-semibold">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] bg-gray-100 flex flex-col justify-center items-center p-8"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderColumn(column1Items, 0)}
        {renderColumn(column2Items, column1Items.length)}
        {/* {renderColumn(
          column3Items,
          column1Items.length + column2Items.length
        )} */}
      </div>
    </div>
  );
}
