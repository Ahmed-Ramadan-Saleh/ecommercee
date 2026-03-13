import React from "react";

const FilterSidebar = ({
  setIsFilterOpen,
  clearFilters,
  selectedSizes,
  toggleSize,
  FILTER_SIZES,
  toggleColor,
  FILTER_COLORS,
  isFilterOpen,
  selectedColors,
}) => {
  return (
    <aside
      className={`filter-sidebar mx-auto lg:w-64 flex-shrink-0 ${isFilterOpen ? "hidden" : ""}`}
      id="filter-sidebar"
    >
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-line">
        <h2 className="font-semibold text-lg text-primary">Filters</h2>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2 hover:bg-muted rounded-full"
        >
          <svg
            className="w-5 h-5 text-primary"
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
        <div className="mb-6 pt-6 border-t border-line first:border-t-0 first:pt-0">
          <h3 className="font-semibold mb-4 text-primary">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {FILTER_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border transition-all ${selectedColors.includes(color.name) ? "ring-2 ring-offset-2 ring-industrial-dark dark:ring-white" : "border-line"}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6 pt-6 border-t border-line">
          <h3 className="font-semibold mb-4 text-primary">Sizes</h3>
          <div className="grid grid-cols-5 gap-2">
            {FILTER_SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => toggleSize(size.label)}
                className={`w-10 h-10 border rounded-lg text-sm font-medium transition-colors ${
                  selectedSizes.includes(size.label)
                    ? "bg-industrial-dark text-white border-industrial-dark"
                    : "border-line hover:border-primary text-primary"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button Mobile */}
        <div className="lg:hidden flex gap-3 pt-6 border-t border-line">
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
  );
};

export default FilterSidebar;
