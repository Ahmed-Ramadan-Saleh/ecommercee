import React from "react";

const ActiveFilters = ({
  selectedColors,
  toggleColor,
  selectedSizes,
  toggleSize,
  clearFilters,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedColors.map((c) => (
        <button
          key={c}
          onClick={() => toggleColor(c)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm text-primary"
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
          className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm text-primary"
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
        className="text-sm text-secondary hover:text-industrial-red underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
