import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Cart = () => {
  // --- Constants ---
  const DELIVERY_FEE = 15;
  const PROMO_CODE = "FIRST20";
  const PROMO_PERCENT = 0.2;

  // --- State ---
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
      color: "White",
      size: "Large",
      price: 145,
      quantity: 1,
    },
    {
      id: 2,
      name: "Checkered Shirt",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80",
      color: "Red",
      size: "Medium",
      price: 180,
      quantity: 1,
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
      color: "Blue",
      size: "Large",
      price: 240,
      quantity: 1,
    },
  ]);

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // --- Computed Values ---
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const discount = promoApplied ? subtotal * PROMO_PERCENT : 0;
  const total = subtotal - discount + DELIVERY_FEE;

  // --- Effects ---

  // Toast Auto-hide
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(
        () => setToast({ show: false, message: "" }),
        3000,
      );
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Scroll Reveal Observer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("active"));
      return;
    }

    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [cartItems]);

  // --- Handlers ---

  const showToast = (message) => setToast({ show: true, message });

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
    showToast("Quantity updated");
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  const applyPromoCode = () => {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError(false);
      showToast("Promo code applied! 20% off");
    } else {
      setPromoApplied(false);
      setPromoError(true);
    }
  };

  // --- Render ---

  return (
    <>
      <Helmet>
        <title>Your Cart - SHOP.CO</title>
      </Helmet>

      <div className="bg-texture px-4">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav
            className="flex items-center text-sm text-secondary"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-industrial-red transition-colors"
            >
              Home
            </Link>
            <svg
              className="w-4 h-4 mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-primary">Cart</span>
          </nav>
        </div>

        {/* Main Content */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <div className="mb-8 reveal">
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary">
                Your Cart
              </h1>
              <p className="text-secondary mt-2">
                You have {cartItems.length} item
                {cartItems.length !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            {/* Cart Content */}
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
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
                                <span>{item.color}</span>,{" "}
                                <span>{item.size}</span>
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

                {/* Continue Shopping */}
                {cartItems.length > 0 && (
                  <div className="mt-6 flex items-center gap-4 reveal">
                    <Link
                      to="/category"
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-industrial-red transition-colors group"
                    >
                      <svg
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {cartItems.length > 0 && (
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
                        <p className="text-xs text-green-600 mt-1">
                          Promo code applied!
                        </p>
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
                          <span className="text-xs text-secondary">
                            {badge.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-industrial-dark dark:bg-black rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden reveal">
              <div className="absolute top-0 left-0 w-64 h-64 bg-industrial-red/20 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                  Stay Updated
                </h2>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  Subscribe to our newsletter and get 15% off your first order.
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-industrial-red"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-industrial-red hover:bg-industrial-red-hover text-white rounded-full font-semibold transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Toast Notification */}
      {toast.show && (
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
      )}
    </>
  );
};

export default Cart;
