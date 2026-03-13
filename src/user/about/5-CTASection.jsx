import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-industrial-dark dark:bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-industrial-red/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-industrial-red/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
          Ready to Elevate Your Style?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Explore our latest arrivals and find your next favorite outfit today.
        </p>
        <Link
          to="/category"
          className="inline-flex items-center gap-2 px-8 py-3 bg-industrial-red hover:bg-industrial-red-hover rounded-full text-white font-semibold transition-colors"
        >
          Shop Now
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
