import React from "react";

const SearchBox = () => {
  return (
    <>
      <svg
        className="w-4 h-4 text-gray-400"
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
        placeholder="Search..."
        className="bg-transparent border-none outline-none ml-2 text-sm w-40 lg:w-56 dark:text-white dark:placeholder-gray-500"
        aria-label="Search products"
      />
    </>
  );
};

export default SearchBox;
