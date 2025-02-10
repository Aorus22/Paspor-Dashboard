"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "@/context/UserContext";
import { menu } from "@/constants/menu";
import NProgress from "nprogress";
import { FaAddressBook, FaHome } from "react-icons/fa";

const MenuItem = ({ item, isActive, openMenu, setOpenMenu }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const childActive =
    item.has_child &&
    item.child_section.some((child) => isActive("/" + child.data_name));

  const isOpen = childActive || openMenu === item.jenis;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return item.has_child ? (
    <li className="mb-2">
      <button
        onClick={() => {
          if (childActive) return;
          setOpenMenu(openMenu === item.jenis ? null : item.jenis);
        }}
        className="w-full flex justify-between items-center py-2 px-4 rounded-md transition-colors focus:outline-none"
      >
        <span className="text-base font-medium text-white">{item.jenis}</span>
        <svg
          className={`w-4 h-4 text-gray-300 transition-transform ${
            isOpen ? "transform rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0px',
        }}
      >
        <ul className="mt-1 ml-4 border-l border-gray-600 pl-4">
          {item.child_section.map((child) => (
            <li key={child.data_name} className="mb-1">
              <Link
                href={"/" + child.data_name}
                className={`block py-1 px-3 rounded-md transition-colors relative ${
                  isActive("/" + child.data_name)
                    ? "bg-gray-600 text-white border-l-4 border-[#788fff]"
                    : "text-gray-300 hover:bg-gray-500 hover:text-white"
                }`}
              >
                {child.judul}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  ) : (
    <li className="mb-2">
      <Link
        href={item.data_name}
        className={`block py-2 px-4 rounded-md transition-colors relative ${
          isActive("/" + item.data_name)
            ? "bg-gray-600 text-white border-l-4 border-[#788fff]"
            : "text-gray-300 hover:bg-gray-500 hover:text-white"
        }`}
      >
        {item.jenis}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const location = usePathname();
  const router = useRouter();
  const { user, loading, error, refetchUser, setUser } = UserContext
    ? useContext(UserContext)
    : { user: null, loading: false, error: null, refetchUser: () => {}, setUser: () => {} };

  const isActive = (path) => location === path;

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
  }, [location]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    NProgress.start();
    router.push("/login");
  };

  return (
    <>
      <aside className="fixed w-72 bg-gray-800 text-white h-screen">
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="shrink-0 p-6 text-2xl font-bold border-b border-gray-700">
              <Link 
                onClick={()=> setOpenMenu(null)}
                href="/">E-LAPOR TIKIM</Link>
            </div>

          <div className="flex-1 overflow-y-auto scrollable">
            <div className="p-4 flex flex-col gap-2">
              <Link
                  href="/"
                  onClick={()=> setOpenMenu(null)}
                  className={`block py-2 px-4 rounded-md transition-colors relative ${
                    isActive("/")
                      ? "bg-gray-600 text-white border-l-4 border-[#788fff]"
                      : "text-gray-300 hover:bg-gray-500 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FaAddressBook />
                  <span>Dashboard</span>
                </div>
              </Link>

              <Link
                href="/home"
                onClick={()=> setOpenMenu(null)}
                className={`block py-2 px-4 rounded-md transition-colors relative ${
                  isActive("/home")
                    ? "bg-gray-600 text-white border-l-4 border-[#788fff]"
                    : "text-gray-300 hover:bg-gray-500 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaHome />
                  <span>Home</span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="pt-2 px-4">
              {menu.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  {/* Section Header */}
                  <h2 className="mb-3 px-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {section.nama_section}
                  </h2>
                  <ul>
                    {section.isi_section.map((item) => (
                      <MenuItem
                        key={item.jenis}
                        item={item}
                        isActive={isActive}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                      />
                    ))}
                  </ul>
                  {sectionIndex < menu.length - 1 && (
                    <hr className="mt-4 border-gray-700" />
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* User Info (tetap di bawah) */}
          <div className="flex-shrink-0 p-6 border-t border-gray-700">
            {loading ? (
              <div className="flex items-center justify-center">
                <div
                  className="w-6 h-6 border-4 border-t-4 border-gray-400 rounded-full animate-spin"
                  aria-label="Loading"
                ></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">
                {error}
                <button
                  onClick={refetchUser}
                  className="text-xs text-blue-500 underline ml-2"
                >
                  Retry
                </button>
              </div>
            ) : user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 14a4 4 0 10-8 0v1a2 2 0 002 2h4a2 2 0 002-2v-1z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 p-2 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-400">Not logged in</div>
            )}
          </div>
        </div>
      </aside>

      <style jsx>{`
        /* CSS murni untuk membuat scrollbar menjadi tipis */
        .scrollable {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
        .scrollable::-webkit-scrollbar {
          width: 6px;
        }
        .scrollable::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .scrollable::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 3px;
          border: 1px solid #1f2937;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
