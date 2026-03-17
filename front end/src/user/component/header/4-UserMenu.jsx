import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({
  dropdownRef,
  toggleDropdown,
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  handleLogout,
}) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-industrial-red flex items-center justify-center text-white font-semibold text-xs">
          {user.initials}
        </div>
        <svg
          className={`w-4 h-4 hidden sm:block text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-60 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 origin-top-right transition-all duration-200 ease-out ${
          isDropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>

        <div className="py-2">
          <Link
            to="/account"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-industrial-red transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-industrial-red transition-colors">
              My Account
            </span>
          </Link>
        </div>

        <div className="py-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-left hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors font-medium">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
