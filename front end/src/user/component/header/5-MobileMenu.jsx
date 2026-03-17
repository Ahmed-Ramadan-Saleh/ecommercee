import React from "react";
import { NavLink } from "react-router-dom";
import SearchBox from "./2-SearchBox";

const MobileMenu = ({ setIsMobileMenuOpen, isMobileMenuOpen, navLinks }) => {
  return (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 ${
        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-4 py-4 space-y-1">
        {/* Search Box Mobile */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-industrial-red/20">
          <SearchBox />
        </div>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive
                  ? "bg-industrial-red/10 text-industrial-red"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Mobile Wishlist Link (Visible only on mobile) */}
        <NavLink
          to="/wishlist"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-3 py-3 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Wishlist
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
