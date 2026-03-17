import React from "react";
import { Link } from "react-router-dom";

const LocationUser = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav
        className="flex items-center text-sm text-secondary"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-industrial-red transition-colors">
          Home
        </Link>
        <svg
          className="w-4 h-4 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-primary">{children}</span>
      </nav>
    </div>
  );
};

export default LocationUser;
