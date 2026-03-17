import React from "react";

const Pagination = ({ changePage, totalPages, currentPage }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-12 reveal">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border border-line rounded-lg hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed text-primary"
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
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
            currentPage === i + 1
              ? "bg-industrial-dark text-white"
              : "border border-line hover:border-primary text-primary"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center border border-line rounded-lg hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed text-primary"
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
  );
};

export default Pagination;
