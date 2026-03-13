import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../shared/ProductCard";
const NewArrivals = ({ NEW_ARRIVALS }) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 reveal">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary">
              New Arrivals
            </h2>
            <p className="text-secondary mt-2">
              Latest additions to our collection
            </p>
          </div>
          <Link
            to="/category"
            className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-industrial-red transition-colors group"
          >
            View All
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {NEW_ARRIVALS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
