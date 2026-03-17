import React from "react";
import { NavLink } from "react-router-dom";

const DesktopNav = ({ navLinks }) => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "text-gray-600 dark:text-gray-300 bb-1-solid pb-1 border-b-2 border-indigo-500"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default DesktopNav;
