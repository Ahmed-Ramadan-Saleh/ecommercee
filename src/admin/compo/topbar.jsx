import React, { useContext } from "react";
import DataContext from "../../Context/ThemeContext";

// Accept the toggle function as a prop from AdminLayout
const Topbar = ({ onToggleSidebar, setonToggleSidebar }) => {
  const { Theme, changeTheme } = useContext(DataContext);

  return (
    <>
      <header className="bg-surface dark:bg-gray-900 border-b border-line fixed top-0 right-0 left-0 z-40 transition-colors">
        <div className="flex items-center justify-between px-6 lg:px-8 h-16">
          {/* Mobile Menu Toggle */}
          <button
            style={{ display: onToggleSidebar ? "" : "none" }}
            onClick={() => {
              setonToggleSidebar(false);
            }} // Added click handler
            className="p-2 -ml-2 text-primary hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* 🔥 Close Button (Mobile Only) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: onToggleSidebar ? "none" : "" }}
            onClick={() => {
              setonToggleSidebar(true);
            }}
            className="w-5 h-5 text-[#111] dark:text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-muted dark:bg-gray-800 rounded-lg px-3 py-2">
              <svg
                className="w-4 h-4 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none ml-2 text-sm w-48 text-primary placeholder-secondary"
                aria-label="Search"
              />
            </div>

            {/* Notifications */}
            <button
              className="relative p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors text-primary"
              aria-label="Notifications"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-industrial-red rounded-full"></span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => changeTheme(Theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors text-primary"
              aria-label="Toggle theme"
            >
              {Theme === "light" ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;
