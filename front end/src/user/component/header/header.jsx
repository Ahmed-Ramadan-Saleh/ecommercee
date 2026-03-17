import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import DataContext from "../../../Context/ThemeContext";
import DesktopNav from "./1-DesktopNav";
import SearchBox from "./2-SearchBox";
import ThemeToggle from "./3-ThemeToggle";
import UserMenu from "./4-UserMenu";
import MobileMenu from "./5-MobileMenu";

const Header = () => {
  let navigate = useNavigate();
  const { Theme, changeTheme } = useContext(DataContext);

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock User Data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
    isLoggedIn: true,
  };

  // Navigation Links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/category", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
  ];

  // Handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  // Effects
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[999]">
      {/* Announcement Bar */}

      <div className="bg-black text-white py-2.5 overflow-hidden">
        <div className="marquee flex whitespace-nowrap animate-marquee hover:pause-animation">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8 text-xs md:text-sm tracking-wide font-medium">
                Free shipping on orders over $100
              </span>
              <span className="mx-8 text-xs md:text-sm tracking-wide font-medium">
                New Collection Available Now
              </span>
              <span className="mx-8 text-xs md:text-sm tracking-wide font-medium">
                Use Code FIRST20 for 20% Off
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <header className="bg-white/95 dark:bg-gray-900 backdrop-blur-lg z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 ">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <NavLink to="/" className="shrink-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">
                SHOP.CO
              </h1>
            </NavLink>

            {/* Desktop Nav */}
            <DesktopNav navLinks={navLinks} />

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Box */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-industrial-red/20">
                <SearchBox />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle changeTheme={changeTheme} Theme={Theme} />

              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
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
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-industrial-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </NavLink>

              {/* Wishlist */}
              <NavLink
                to="/wishlist"
                className="hidden sm:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
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
              <UserMenu
                dropdownRef={dropdownRef}
                toggleDropdown={toggleDropdown}
                user={user}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                handleLogout={handleLogout}
              />

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                aria-label="Menu"
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
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          navLinks={navLinks}
        />
      </header>
    </div>
  );
};

export default Header;
