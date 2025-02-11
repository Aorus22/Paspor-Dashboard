"use client";

import { getDataNamePairs } from "@/constants/menu";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight, FaWindows } from "react-icons/fa";
import { toast } from "react-toastify";

export default function DataPage() {
  const [data, setData] = useState([]);
  const [tableName, setTableName] = useState("");
  const [month, setMonth] = useState("");
  const [newValue, setNewValue] = useState("");

  const [isOverflowing, setIsOverflowing] = useState(false);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    fetch("/api/data/")
      .then((res) => res.json())
      .then((data) => setData(transformData(data)))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const DataNamePairs = getDataNamePairs();

  const transformData = (rawData) => {
    return Object.entries(rawData).map(([key, records]) => {
      const row = { tableName: DataNamePairs[key] || key, total: 0 };
      months.forEach((month) => (row[month] = 0));

      records.forEach(({ month, total }) => {
        row[month] = total;
        row.total += total;
      });

      return row;
    })
    .sort((a, b) => a.tableName.localeCompare(b.tableName));
  };

  const handleUpdate = async () => {
    if (!tableName || !month || !newValue) {
      toast.warning("Harap isi semua form");
      return;
    }

    if (newValue < 0 ){
      toast.warning("Harap masukkan nilai positif");
      return;
    }

    try {
      const res = await fetch(`/api/data/${tableName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: month, total: newValue }),
      });

      if (res.ok) {
        toast.success("Data berhasil diperbarui!");
        setData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.tableName === DataNamePairs[tableName]) {
              return {
                ...item,
                [month]: newValue,
              };
            }
            return item;
          });
        
          return updatedData;
        });
      } else {
        toast.error("Gagal memperbarui data!");
      }
    } catch (error) {
      toast.error("Error updating data:", error);
    }
  };

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (tableContainerRef.current) {
        setIsOverflowing(tableContainerRef.current.scrollWidth > tableContainerRef.current.clientWidth);
      }
    };
  
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="py-12 min-h-[calc(100vh-80px)] bg-white text-gray-800 flex flex-col items-center">
      {/* Tabel */}
      <div className="relative max-w-[85%]">
        <div ref={tableContainerRef} className="overflow-x-auto bg-white rounded-xl border border-gray-300">
          <table className="min-w-[1200px] w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th className="p-3 border-b border-gray-300">Data</th>
                {months.map((month) => (
                  <th key={month} className="p-3 border-b border-gray-300">{month}</th>
                ))}
                <th className="p-3 border-b border-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-200">
                    <td className="text-left p-3 border-b border-gray-200 font-semibold">{row.tableName}</td>
                    {months.map((month) => (
                      <td key={month} className="text-center p-3 border-b border-gray-200">{row[month] || 0}</td>
                    ))}
                    <td className="p-3 border-b text-center border-gray-200 font-bold bg-gray-100">{row.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="p-4 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isOverflowing && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute -left-9 top-0 bottom-0 flex items-center justify-center bg-gray-300 bg-opacity-50 hover:bg-opacity-75 w-8 rounded-md"
            >
              <FaArrowCircleLeft />
            </button>
            <button
              onClick={scrollRight}
              className="absolute -right-9 top-0 bottom-0 flex items-center justify-center bg-gray-300 bg-opacity-50 hover:bg-opacity-75 w-8 rounded-md"
            >
              <FaArrowCircleRight />
            </button>
          </>
        )}

      </div>

      {/* Form Input */}
      <div className="mt-6 bg-white rounded-xl p-4 border border-gray-300 max-w-[85%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          >
            <option value="">Pilih Data</option>
            {Object.entries(DataNamePairs).map(([key, records]) => (
              <option key={key} value={key}>
                {records}
              </option>
            ))}
          </select>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Pilih Bulan</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Nilai"
            className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdate}
          className="mt-4 w-full p-2 bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded transition"
        >
          Perbarui Data
        </button>
      </div>
    </div>

  );
}
