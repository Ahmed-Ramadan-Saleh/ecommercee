import React from "react";

const Toolbar = ({
  selectedSort,
  handleSortSelect,
  isSortOpen,
  setIsSortOpen,
  sortDropdownRef,
  PRODUCTS,
  setIsFilterOpen,
}) => {
  const SearchBy = ["popular", "newest", "price-low", "price-high"];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-line rounded-full text-sm font-medium text-primary hover:bg-muted transition-colors"
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
        <p className="text-sm text-secondary">
          Showing{" "}
          <span className="text-primary font-medium">{PRODUCTS.length}</span>{" "}
          products
        </p>
      </div>

      {/* Sort */}
      <div className="sort-dropdown relative" ref={sortDropdownRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-line rounded-full text-sm font-medium hover:border-primary transition-colors text-primary"
        >
          <span>
            Sort: {selectedSort.charAt(0).toUpperCase() + selectedSort.slice(1)}
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
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-line rounded-xl shadow-lg z-20">
            <div className="p-2">
              {SearchBy.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSortSelect(opt)}
                  className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedSort === opt
                      ? "bg-muted font-medium text-primary"
                      : "text-secondary hover:bg-muted"
                  }`}
                >
                  {opt === "price-low"
                    ? "Price: Low to High"
                    : opt === "price-high"
                      ? "Price: High to Low"
                      : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
