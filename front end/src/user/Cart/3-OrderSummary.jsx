import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({
  promoInput,
  setPromoInput,
  setPromoError,
  applyPromoCode,
  promoApplied,
  promoError,
  total,
  DELIVERY_FEE,
  discount,
  subtotal,
}) => {
  return (
    <div className="lg:col-span-4 mt-8 lg:mt-0">
      <div
        className="bg-surface rounded-2xl border border-line p-6 reveal shadow-sm"
        style={{ transitionDelay: "0.1s" }}
      >
        <h2 className="font-display text-xl font-semibold mb-6 text-primary">
          Order Summary
        </h2>

        {/* Promo Code */}
        <div className="mb-6">
          <label className="text-sm font-medium text-primary mb-2 block">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError(false);
              }}
              placeholder="Enter code"
              className="form-input flex-1 px-4 py-3 rounded-xl text-sm"
              aria-label="Promo code"
            />
            <button
              onClick={applyPromoCode}
              className="btn-secondary px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap"
            >
              Apply
            </button>
          </div>
          <p className="text-xs text-secondary mt-2">
            Try: FIRST20 for 20% off
          </p>
          {promoApplied && (
            <p className="text-xs text-green-600 mt-1">Promo code applied!</p>
          )}
          {promoError && (
            <p className="text-xs text-industrial-red mt-1">
              Invalid promo code
            </p>
          )}
        </div>

        <div className="h-px bg-line mb-6" />

        {/* Pricing */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Sub-total</span>
            <span className="font-medium text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Discount</span>
            <span
              className={`font-medium ${promoApplied ? "text-industrial-red" : "text-primary"}`}
            >
              -${discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Delivery</span>
            <span className="font-medium text-primary">
              ${DELIVERY_FEE.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="h-px bg-line mb-6" />

        {/* Total */}
        <div className="flex justify-between items-baseline mb-6">
          <span className="font-medium text-primary">Total</span>
          <span className="font-display text-2xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Checkout Button */}
        <Link to={"/checkout"} className="block">
          <button className="btn-primary w-full py-4 rounded-full font-semibold relative z-10 text-center">
            Go to Checkout
          </button>
        </Link>

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t border-line">
          <p className="text-xs text-secondary mb-3 text-center">
            Secure checkout powered by
          </p>
          <div className="flex justify-center items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/32/349/349221.png"
              alt="Visa"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity dark:invert"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/32/349/349228.png"
              alt="Mastercard"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity dark:invert"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/32/349/349230.png"
              alt="PayPal"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/32/5968/5968299.png"
              alt="Apple Pay"
              className="h-6 opacity-60 hover:opacity-100 transition-opacity dark:invert"
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          {[
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              ),
              label: "Secure",
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              ),
              label: "Returns",
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              ),
              label: "Shipping",
            },
          ].map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <svg
                className="w-5 h-5 text-secondary mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {badge.icon}
              </svg>
              <span className="text-xs text-secondary">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
