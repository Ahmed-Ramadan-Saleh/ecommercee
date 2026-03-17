import React, { useState, useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LocationUser from "../shared/LocationUser";
import FilterSidebar from "./1-FilterSidebar";
import Toolbar from "./2-Toolbar";
import ActiveFilters from "./3-ActiveFilters";
import ProductsGrid from "./4-ProductsGrid";
import Pagination from "./5-Pagination";

// --- Constants ---
const ITEMS_PER_PAGE = 12;

const FILTER_COLORS = [
  { id: 1, name: "Black", hex: "#1A1A1A" },
  { id: 2, name: "White", hex: "#FFFFFF" },
  { id: 3, name: "Grey", hex: "#9E9E9E" },
  { id: 4, name: "Navy", hex: "#1E3A5F" },
  { id: 5, name: "Olive", hex: "#606C38" },
  { id: 6, name: "Brown", hex: "#722F37" },
  { id: 7, name: "Beige", hex: "#D4B896" },
  { id: 8, name: "Blue", hex: "#3B82F6" },
];

const FILTER_SIZES = [
  { id: 1, label: "XS" },
  { id: 2, label: "S" },
  { id: 3, label: "M" },
  { id: 4, label: "L" },
  { id: 5, label: "XL" },
  { id: 6, label: "2XL" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Gradient Graphic T-Shirt",
    price: 145,
    rating: 4.5,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    badge: null,
    category: "T-Shirts",
    colors: ["#1A1A1A", "#FFFFFF"],
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    price: 180,
    rating: 4.3,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc4f64f0a28?w=400&q=80",
    badge: "New",
    category: "Polo Shirts",
    colors: ["#1E3A5F", "#FFFFFF"],
  },
  {
    id: 3,
    name: "Classic Fit Jeans",
    price: 215,
    originalPrice: 270,
    rating: 4.7,
    reviews: 256,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    badge: "-20%",
    category: "Jeans",
    colors: ["#3B5998"],
  },
  {
    id: 4,
    name: "Relaxed Fit T-Shirt",
    price: 120,
    rating: 4.1,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    badge: null,
    category: "T-Shirts",
    colors: ["#9E9E9E", "#1A1A1A"],
  },
  {
    id: 5,
    name: "Casual Polo Shirt",
    price: 165,
    rating: 4.6,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    badge: null,
    category: "Polo Shirts",
    colors: ["#606C38"],
  },
  {
    id: 6,
    name: "Slim Fit Chino Shorts",
    price: 95,
    originalPrice: 120,
    rating: 4.4,
    reviews: 145,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
    badge: "-21%",
    category: "Shorts",
    colors: ["#D4B896"],
  },
  {
    id: 7,
    name: "Vintage Wash Jeans",
    price: 240,
    rating: 4.8,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&q=80",
    badge: "Hot",
    category: "Jeans",
    colors: ["#1A1A1A"],
  },
  {
    id: 8,
    name: "Essential Crew Neck",
    price: 85,
    rating: 4.2,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    badge: null,
    category: "T-Shirts",
    colors: ["#FFFFFF", "#1A1A1A", "#9E9E9E"],
  },
  {
    id: 9,
    name: "Premium Cotton Hoodie",
    price: 195,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
    badge: null,
    category: "Hoodies",
    colors: ["#1A1A1A", "#9E9E9E"],
  },
  {
    id: 10,
    name: "Striped Polo Shirt",
    price: 150,
    originalPrice: 180,
    rating: 4.5,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    badge: "-17%",
    category: "Polo Shirts",
    colors: ["#FFFFFF", "#1E3A5F"],
  },
  {
    id: 11,
    name: "Ripped Skinny Jeans",
    price: 225,
    rating: 4.3,
    reviews: 421,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
    badge: null,
    category: "Jeans",
    colors: ["#3B5998", "#1A1A1A"],
  },
  {
    id: 12,
    name: "Oversized Graphic Tee",
    price: 110,
    rating: 4.7,
    reviews: 289,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80",
    badge: "New",
    category: "T-Shirts",
    colors: ["#FFFFFF"],
  },
];

// --- Helper Component ---
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          );
        }
        if (i === fullStars && hasHalf) {
          return (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" />
            </svg>
          );
        }
        return (
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
};

const Category = () => {
  // --- State ---
  const [selectedColors, setSelectedColors] = useState(["Grey"]);
  const [selectedSizes, setSelectedSizes] = useState(["S", "M"]);
  const [currentPage, setCurrentPage] = useState(1);

  // UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("popular");

  const sortDropdownRef = useRef(null);

  // --- Computed Data ---
  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return PRODUCTS.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  // --- Effects ---

  // Scroll Reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        }),
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentProducts]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target)
      ) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName],
    );
  };

  const toggleSize = (sizeLabel) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeLabel)
        ? prev.filter((s) => s !== sizeLabel)
        : [...prev, sizeLabel],
    );
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const handleSortSelect = (value) => {
    setSelectedSort(value);
    setIsSortOpen(false);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Casual - SHOP.CO</title>
      </Helmet>

      <div className="bg-texture px-4">
        {/* Overlay for mobile filter */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Breadcrumb & Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationUser>Shop</LocationUser>
        </div>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-8">
              {/* Filter Sidebar */}
              <FilterSidebar
                setIsFilterOpen={setIsFilterOpen}
                clearFilters={clearFilters}
                selectedSizes={selectedSizes}
                toggleSize={toggleSize}
                FILTER_SIZES={FILTER_SIZES}
                toggleColor={toggleColor}
                FILTER_COLORS={FILTER_COLORS}
                isFilterOpen={isFilterOpen}
                selectedColors={selectedColors}
              />

              {/* Products Grid */}
              <main className="flex-1">
                {/* Toolbar */}
                <Toolbar
                  selectedSort={selectedSort}
                  handleSortSelect={handleSortSelect}
                  isSortOpen={isSortOpen}
                  setIsSortOpen={setIsSortOpen}
                  sortDropdownRef={sortDropdownRef}
                  PRODUCTS={PRODUCTS}
                  setIsFilterOpen={setIsFilterOpen}
                />

                {/* Active Filters */}
                {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                  <ActiveFilters
                    selectedColors={selectedColors}
                    toggleColor={toggleColor}
                    selectedSizes={selectedSizes}
                    toggleSize={toggleSize}
                    clearFilters={clearFilters}
                  />
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
                  {currentProducts.map((product, index) => (
                    <ProductsGrid
                      product={product}
                      index={index}
                      StarRating={StarRating}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  changePage={changePage}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Category;
