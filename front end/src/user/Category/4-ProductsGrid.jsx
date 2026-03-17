import React from "react";
import { Link } from "react-router-dom";

const ProductsGrid = ({ product, index, StarRating }) => {
  return (
    <Link
      to="/detail"
      key={product.id}
      className="product-card rounded-2xl overflow-hidden reveal"
      style={{ transitionDelay: `${index * 0.05}s` }}
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
          <span className="text-xs text-secondary">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-secondary line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-line"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductsGrid;
