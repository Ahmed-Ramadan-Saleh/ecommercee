import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // UI State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock User Data (Replace with actual auth logic)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
  };

  // Handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    console.log("User logged out");
    setIsDropdownOpen(false);
    // Add your logout logic here
  };

  // Effects
  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Apply dark mode class to HTML element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1A1A1A] text-white py-2.5 overflow-hidden">
        <div className="marquee flex whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8 text-sm tracking-wide">
                Free shipping on orders over $100
              </span>
              <span className="mx-8 text-sm tracking-wide">
                New Collection Available Now
              </span>
              <span className="mx-8 text-sm tracking-wide">
                Use Code FIRST20 for 20% Off
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <header className="sticky top-0 bg-[#FAFAF7]/95 backdrop-blur-md z-50 border-b border-[#E8E8E5] dark:bg-gray-900 dark:border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <NavLink
              to="/"
              className="font-display text-2xl lg:text-3xl font-bold tracking-tight dark:text-white"
            >
              SHOP.CO
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C45C3E]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#C45C3E]"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  `nav-link text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C45C3E]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#C45C3E]"
                  }`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C45C3E]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#C45C3E]"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C45C3E]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#C45C3E]"
                  }`
                }
              >
                Contact us
              </NavLink>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="hidden md:flex items-center bg-[#F0F0ED] dark:bg-gray-800 rounded-full px-4 py-2">
                <svg
                  className="w-4 h-4 text-[#8A8A8A]"
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
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none ml-2 text-sm w-40 lg:w-56 dark:text-white dark:placeholder-gray-400"
                  aria-label="Search products"
                />
              </div>

              {/* Dark/Light Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-[#F0F0ED] dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  // Sun Icon (Click to go Light)
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  // Moon Icon (Click to go Dark)
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

              {/* Cart Icon */}
              <NavLink
                to="/cart"
                className="p-2 hover:bg-[#F0F0ED] dark:hover:bg-gray-700 rounded-full transition-colors relative text-gray-700 dark:text-gray-300"
                aria-label="Shopping cart"
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C45C3E] text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </NavLink>

              {/* Wishlist Icon */}
              <NavLink
                to="/wishlist" // Fixed: Changed from /cart to /wishlist
                className="p-2 hover:bg-[#F0F0ED] dark:hover:bg-gray-700 rounded-full transition-colors relative text-gray-700 dark:text-gray-300"
                aria-label="Wishlist"
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </NavLink>

              {/* User Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 p-1 hover:bg-[#F0F0ED] dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="User menu"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-[#C45C3E] flex items-center justify-center text-white font-semibold text-sm">
                    {user.initials}
                  </div>
                  <svg
                    className={`w-4 h-4 hidden sm:block transition-transform dark:text-gray-300 ${isDropdownOpen ? "rotate-180" : ""}`}
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

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl border border-[#E8E8E5] dark:border-gray-700 shadow-lg z-50 animate-fade-in">
                    <div className="p-4 border-b border-[#E8E8E5] dark:border-gray-700">
                      <p className="font-semibold dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-[#8A8A8A]">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/account"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#F0F0ED] dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-[#8A8A8A]"
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
                        My Account
                      </Link>
                    </div>
                    <div className="py-2 border-t border-[#E8E8E5] dark:border-gray-700">
                                <Link to={"/signin"}>
                                
                                
                                
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left text-[#C45C3E] hover:bg-[#F0F0ED] dark:hover:bg-gray-700 transition-colors"
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                                </Link>
                    
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 hover:bg-[#F0F0ED] dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                aria-label="Menu"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-[#E8E8E5] dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#C45C3E] transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/category"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#C45C3E] transition-colors"
              >
                Category
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#C45C3E] transition-colors"
              >
                Cart
              </NavLink>
              <NavLink
                to="/detail"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#C45C3E] transition-colors"
              >
                Details
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
