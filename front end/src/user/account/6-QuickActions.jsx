import React from "react";

const QuickActions = () => {
  return (
    <div
      className="grid md:grid-cols-2 gap-4 animate-fade-up"
      style={{ animationDelay: "0.25s" }}
    >
      {/* Address Card */}
      <div className="bg-surface rounded-2xl border border-line p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-primary">Default Address</h3>
          <a
            href="#"
            className="text-sm text-industrial-red hover:text-industrial-red-hover transition-colors"
          >
            Edit
          </a>
        </div>
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="text-sm">
            <p className="font-medium text-primary">John Doe</p>
            <p className="text-secondary mt-1">123 Fashion Street, Apt 4B</p>
            <p className="text-secondary">New York, NY 10001</p>
            <p className="text-secondary">United States</p>
          </div>
        </div>
      </div>

      {/* Payment Card */}
      <div className="bg-surface rounded-2xl border border-line p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-primary">Default Payment</h3>
          <a
            href="#"
            className="text-sm text-industrial-red hover:text-industrial-red-hover transition-colors"
          >
            Edit
          </a>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-12 h-8 bg-industrial-dark rounded flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
          </div>
          <div className="text-sm">
            <p className="font-medium text-primary">Visa ending in 4242</p>
            <p className="text-secondary">Expires 12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
