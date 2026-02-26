import React, { useState, useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./category.css"; // Assuming custom CSS for animations is here
import { Link } from "react-router-dom";

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
              className="w-4 h-4 star-filled"
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
              className="w-4 h-4 star-filled"
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
            className="w-4 h-4 star-empty"
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
  }, [currentProducts]); // Re-observe when products change

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
      <div className="bg-texture">
        {/* Overlay for mobile filter */}
        {isFilterOpen && (
          <div
            className="filter-overlay open"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Breadcrumb & Title */}
        <div className="bg-[#F0F0ED] py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm text-[#8A8A8A] mb-4">
              <a href="#" className="hover:text-[#C45C3E]">
                Home
              </a>
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
              <a href="#" className="hover:text-[#C45C3E]">
                Shop
              </a>
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
              <span className="text-[#1A1A1A]">Casual</span>
            </nav>
            <h1 className="font-display text-3xl lg:text-4xl font-bold">
              Casual
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Filter Sidebar */}
              <aside
                className={`filter-sidebar lg:w-64 flex-shrink-0 ${isFilterOpen ? "open" : ""}`}
                id="filter-sidebar"
              >
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#E8E8E5]">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-[#F0F0ED] rounded-full"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4 lg:p-0">
                  {/* Colors */}
                  <div className="mb-6 pt-6 border-t border-[#E8E8E5] first:border-t-0 first:pt-0">
                    <h3 className="font-semibold mb-4">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {FILTER_COLORS.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => toggleColor(color.name)}
                          className={`filter-color w-8 h-8 rounded-full border ${selectedColors.includes(color.name) ? "selected ring-2 ring-offset-2 ring-[#1A1A1A]" : "border-[#E8E8E5]"}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-6 pt-6 border-t border-[#E8E8E5]">
                    <h3 className="font-semibold mb-4">Sizes</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {FILTER_SIZES.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => toggleSize(size.label)}
                          className={`filter-size w-10 h-10 border rounded-lg text-sm font-medium transition-colors ${selectedSizes.includes(size.label) ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "border-[#E8E8E5] hover:border-[#1A1A1A]"}`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button Mobile */}
                  <div className="lg:hidden flex gap-3 pt-6 border-t border-[#E8E8E5]">
                    <button
                      onClick={clearFilters}
                      className="flex-1 btn-secondary px-4 py-3 rounded-full font-medium"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 btn-primary px-4 py-3 rounded-full font-medium relative z-10"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <main className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E8E8E5] rounded-full text-sm font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Filters
                    </button>
                    <p className="text-sm text-[#8A8A8A]">
                      Showing{" "}
                      <span className="text-[#1A1A1A] font-medium">
                        {PRODUCTS.length}
                      </span>{" "}
                      products
                    </p>
                  </div>

                  {/* Sort */}
                  <div className="sort-dropdown relative" ref={sortDropdownRef}>
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E5] rounded-full text-sm font-medium hover:border-[#1A1A1A] transition-colors"
                    >
                      <span>
                        Sort:{" "}
                        {selectedSort.charAt(0).toUpperCase() +
                          selectedSort.slice(1)}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
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

                    {isSortOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E8E8E5] rounded-xl shadow-lg z-20">
                        <div className="p-2">
                          {["popular", "newest", "price-low", "price-high"].map(
                            (opt) => (
                              <button
                                key={opt}
                                onClick={() => handleSortSelect(opt)}
                                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${selectedSort === opt ? "bg-[#F0F0ED] font-medium" : "hover:bg-[#F0F0ED]"}`}
                              >
                                {opt === "price-low"
                                  ? "Price: Low to High"
                                  : opt === "price-high"
                                    ? "Price: High to Low"
                                    : opt.charAt(0).toUpperCase() +
                                      opt.slice(1)}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleColor(c)}
                        className="filter-tag flex items-center gap-2 px-3 py-1.5 bg-[#F0F0ED] rounded-full text-sm"
                      >
                        {c}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    ))}
                    {selectedSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className="filter-tag flex items-center gap-2 px-3 py-1.5 bg-[#F0F0ED] rounded-full text-sm"
                      >
                        Size: {s}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    ))}
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#8A8A8A] hover:text-[#C45C3E] underline ml-2"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
                  {currentProducts.map((product, index) => (
                    <Link
                      to="/detail"
                      key={product.id}
                      className="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl reveal"
                      style={{ transitionDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0ED]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image w-full h-full object-cover"
                        />
                        {product.badge && (
                          <span
                            className={`absolute top-3 left-3 px-3 py-1 text-white text-xs font-medium rounded-full ${product.badge.includes("%") ? "bg-[#C45C3E]" : "bg-[#1A1A1A]"}`}
                          >
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sm lg:text-base mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={product.rating} />
                          <span className="text-xs text-[#8A8A8A]">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-[#8A8A8A] line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {product.colors.slice(0, 3).map((c, i) => (
                              <span
                                key={i}
                                className="w-3 h-3 rounded-full border border-[#E8E8E5]"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-12 reveal">
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center border border-[#E8E8E5] rounded-lg hover:border-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => changePage(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${currentPage === i + 1 ? "bg-[#1A1A1A] text-white" : "border border-[#E8E8E5] hover:border-[#1A1A1A]"}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center border border-[#E8E8E5] rounded-lg hover:border-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4"
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
                  </button>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Category;
