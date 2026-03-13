import React from "react";

const OrderSummary = ({
  cartItems,
  shipping,
  subtotal,
  updateQuantity,
  total,
}) => {
  return (
    <div className="lg:col-span-5 mt-8 lg:mt-0">
      <div
        className="bg-surface rounded-2xl border border-line p-6 shadow-sm lg:sticky lg:top-24 animate-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h2 className="font-display text-xl font-semibold mb-6 text-primary">
          Order Summary
        </h2>

        {/* Items List */}
        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-industrial-dark text-white text-xs rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate text-primary">
                  {item.name}
                </h4>
                <p className="text-xs text-secondary">Size: {item.size}</p>
                <p className="text-sm font-semibold mt-1 text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="text-secondary hover:text-primary text-xs"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="text-secondary hover:text-primary text-xs"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Promo Code"
            className="form-input flex-1 px-4 py-2 rounded-lg text-sm"
          />
          <button
            type="button"
            className="px-4 py-2 bg-industrial-dark text-white text-sm rounded-lg hover:bg-industrial-dark/90 transition-colors"
          >
            Apply
          </button>
        </div>

        {/* Totals */}
        <div className="space-y-3 border-t border-line pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Subtotal</span>
            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Shipping</span>
            <span className="text-primary">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-line pt-3 mt-3 text-primary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          className="btn-primary w-full py-4 rounded-full font-semibold mt-6 flex items-center justify-center gap-2"
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Place Order
        </button>

        <p className="text-xs text-secondary text-center mt-4">
          Your payment information is processed securely.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
