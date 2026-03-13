import React from "react";

const Toaster = ({ toast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-surface border border-line shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm text-primary">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toaster;
