"use client";

import React, { useState, useEffect } from "react";
import { getFullMenuName, menu } from "@/constants/menu";
import Link from "next/link";
import {
  FaRegIdCard,
  FaPassport,
  FaUserCheck,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

export default function Home() {
  const [activeJenisIndex, setActiveJenisIndex] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const iconMapping = {
    paspor_biasa_5_tahun: FaRegIdCard,
    paspor_biasa_10_tahun: FaRegIdCard,
    paspor_elektronik_5_tahun: FaPassport,
    paspor_elektronik_10_tahun: FaPassport,
    "Penerbitan Izin Tinggal Kunjungan": FaUserCheck,
    "Penerbitan Izin Tinggal Terbatas": FaUserCheck,
    "Penerbitan Izin Tinggal Tetap": FaUserCheck,
    "Layanan Percepatan Paspor": FaGlobe,
  };

  const handleJenisClick = (jenisIndex) => {
    setActiveJenisIndex(jenisIndex);
  };

  const handleBack = () => {
    if (activeJenisIndex !== null) {
      setActiveJenisIndex(null);
    }
  };

  const masaBerlakuColors = [
    "#732324",
    "#6c2373",
    "#23712c",
    "#129184",
    "#937913",
    "#9a490c",
    "#1c1970",
    "#46aad2",
  ];

  const mainItems = [
    // {
    //   href: "paspor_biasa_5_tahun",
    //   label: getFullMenuName("paspor_biasa_5_tahun"),
    //   bg: "#732324",
    //   icon: iconMapping["paspor_biasa_5_tahun"],
    //   type: "link",
    // },
    // {
    //   href: "paspor_biasa_10_tahun",
    //   label: getFullMenuName("paspor_biasa_10_tahun"),
    //   bg: "#6c2373",
    //   icon: iconMapping["paspor_biasa_10_tahun"],
    //   type: "link",
    // },
    {
      href: "paspor_elektronik_5_tahun",
      label: getFullMenuName("paspor_elektronik_5_tahun"),
      bg: "#23712c",
      icon: iconMapping["paspor_elektronik_5_tahun"],
      type: "link",
    },
    {
      href: "paspor_elektronik_10_tahun",
      label: getFullMenuName("paspor_elektronik_10_tahun"),
      bg: "#129184",
      icon: iconMapping["paspor_elektronik_10_tahun"],
      type: "link",
    },
    {
      label: "Penerbitan Izin Tinggal Kunjungan",
      bg: "#937913",
      icon: iconMapping["Penerbitan Izin Tinggal Kunjungan"],
      onClick: () => handleJenisClick(0),
      type: "button",
    },
    {
      label: "Penerbitan Izin Tinggal Terbatas",
      bg: "#9a490c",
      icon: iconMapping["Penerbitan Izin Tinggal Terbatas"],
      onClick: () => handleJenisClick(1),
      type: "button",
    },
    {
      label: "Penerbitan Izin Tinggal Tetap",
      bg: "#1c1970",
      icon: iconMapping["Penerbitan Izin Tinggal Tetap"],
      onClick: () => handleJenisClick(2),
      type: "button",
    },
    // {
    //   href: "/layanan_percepatan_paspor",
    //   label: "Layanan Percepatan Paspor",
    //   bg: "#46aad2",
    //   icon: iconMapping["Layanan Percepatan Paspor"],
    //   type: "link",
    // },
  ];

  return (
    <div
      className={`h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center ${
        activeJenisIndex === null ? "justify-center" : ""
      } p-8`}
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {activeJenisIndex !== null && (
        <button
          onClick={handleBack}
          className={`
            mb-4 px-4 py-2 bg-[#4a6283] text-white rounded hover:opacity-90
            transition-all duration-700 hover:duration-10
            ease-[cubic-bezier(0.4, 0, 0.2, 1)]
            opacity-0 scale-95 translate-y-2
            ${showContent ? "opacity-100 scale-100 translate-y-0" : ""}
          `}
          style={{ transitionDelay: "0ms" }} 
        >
          Kembali
        </button>
      )}

      {activeJenisIndex === null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mainItems.map((item, idx) => {
            const IconComponent = item.icon;
            const delay = idx * 75; 

            if (item.type === "link") {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`
                    font-semibold rounded-lg shadow w-80 p-4 py-10
                    cursor-pointer text-center text-white
                    hover:opacity-90 hover:duration-10
                    transition-all duration-700
                    ease-[cubic-bezier(0.4, 0, 0.2, 1)]
                    opacity-0 scale-95 translate-y-2
                    ${showContent ? "opacity-100 scale-100 translate-y-0" : ""}
                  `}
                  style={{
                    backgroundColor: item.bg,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {IconComponent && (
                      <IconComponent className="text-3xl shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            } else {
              return (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className={`
                    font-semibold rounded-lg shadow w-80 p-4 py-10
                    cursor-pointer text-center text-white
                    hover:opacity-90 hover:duration-10
                    transition-all duration-700
                    ease-[cubic-bezier(0.4, 0, 0.2, 1)]
                    opacity-0 scale-95 translate-y-2
                    ${showContent ? "opacity-100 scale-100 translate-y-0" : ""}
                  `}
                  style={{
                    backgroundColor: item.bg,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {IconComponent && (
                      <IconComponent className="text-3xl shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            }
          })}
        </div>
      )}

      {activeJenisIndex !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu[1].isi_section[activeJenisIndex].child_section.map(
            (masa, idx) => {
              const delay = idx * 75;

              return (
                <Link
                  href={`/${masa.data_name}`}
                  key={idx}
                  className={`
                    rounded shadow p-4 text-center flex items-center justify-center gap-2 text-white
                    hover:opacity-90 hover:duration-10
                    transition-all duration-700
                    ease-[cubic-bezier(0.4, 0, 0.2, 1)]
                    opacity-0 scale-95 translate-y-2
                    ${showContent ? "opacity-100 scale-100 translate-y-0" : ""}
                  `}
                  style={{
                    backgroundColor:
                      masaBerlakuColors[idx % masaBerlakuColors.length],
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  <FaClock className="text-white text-xl shrink-0" />
                  <p className="font-medium text-sm">{masa.judul}</p>
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
