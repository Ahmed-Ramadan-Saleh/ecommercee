import StarRating from "./StarRating";

const ProductCard = ({ product, index }) => (
  <div
    className="product-card group bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl reveal"
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
      <button
        className="absolute top-3 right-3 w-10 h-10 bg-surface/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-industrial-red hover:text-white transition-all"
        aria-label="Add to wishlist"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-sm lg:text mb-2 line-clamp-1 text-primary">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mb-2">
        <StarRating rating={product.rating} />
        <span className="text-xs text-secondary">({product.reviews})</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-primary">${product.price}</span>
        {product.originalPrice && (
          <span className="text-sm text-secondary line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default ProductCard;
