import React from "react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ StarRating, SIMILAR_PRODUCTS }) => {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 reveal">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary">
              You May Also Like
            </h2>
            <p className="text-secondary mt-1">
              Similar styles you might enjoy
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
          {SIMILAR_PRODUCTS.map((product, index) => (
            <Link
              to="/detail"
              key={product.id}
              className="product-card rounded-2xl overflow-hidden reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image w-full h-full object-cover"
                />
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-white text-xs font-medium rounded-full ${product.badge.includes("%") ? "bg-industrial-red" : "bg-industrial-dark"}`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm lg:text-base mb-2 line-clamp-1 text-primary">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-secondary">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-secondary line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
