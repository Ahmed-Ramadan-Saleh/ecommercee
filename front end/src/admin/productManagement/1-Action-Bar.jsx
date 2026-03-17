import React from "react";

const ActionBar = ({
  openPanel,
  setStatusFilter,
  statusFilter,
  setCategoryFilter,
  categoryFilter,
  setSearchQuery,
  searchQuery,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary"
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10 pr-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-input px-4 py-2 rounded-lg w-full sm:w-40"
          >
            <option value="all">All Categories</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Polo Shirts">Polo Shirts</option>
            <option value="Hoodies">Hoodies</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input px-4 py-2 rounded-lg w-full sm:w-40"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => openPanel(false)}
        className="btn-primary px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap w-full sm:w-auto"
      >
        Add Product
      </button>
    </div>
  );
};

export default ActionBar;
