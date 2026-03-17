import React from "react";
import { Link } from "react-router-dom";

const CartContent = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div className="bg-surface rounded-2xl border border-line overflow-hidden reveal shadow-sm">
      {/* Header Desktop */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-muted text-sm font-medium text-secondary">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Subtotal</div>
      </div>

      {/* Items List */}
      <div id="cart-items">
        {cartItems.length === 0 ? (
          <div className="p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-line mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="font-display text-xl font-semibold mb-2 text-primary">
              Your cart is empty
            </h3>
            <p className="text-secondary mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/category"
              className="btn-primary px-6 py-3 rounded-full text-sm font-semibold relative z-10 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 border-b border-line last:border-b-0"
            >
              {/* Product Info */}
              <div className="md:col-span-6 flex gap-4">
                <div className="w-24 h-24 md:w-20 md:h-20 flex-shrink-0 bg-muted rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className=" font-medium text-sm md:text-secondary line-clamp-1 ">
                    {item.name}
                  </h3>
                  <p className="text-sm text-secondary mt-1">
                    <span>{item.color}</span>, <span>{item.size}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:hidden">
                    <span className="font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                <span className="text-sm text-secondary md:hidden">
                  Quantity
                </span>
                <div className="flex items-center border border-line rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center rounded-l-lg disabled:opacity-40 hover:bg-muted transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-primary">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-r-lg hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Price Desktop */}
              <div className="hidden md:flex md:col-span-2 items-center justify-center">
                <span className="font-medium text-primary">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Subtotal Desktop */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center">
                <span className="font-bold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Remove Desktop */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-secondary hover:text-industrial-red transition-colors"
                  aria-label="Remove item"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Remove & Subtotal */}
              <div className="md:hidden flex items-center justify-between pt-2 border-t border-line mt-2">
                <span className="text-sm text-secondary">
                  Subtotal:{" "}
                  <span className="font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-industrial-red flex items-center gap-1"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartContent;
