import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Toaster from "../shared/Toaster";
import LocationUser from "../shared/LocationUser";
import Title from "./1-Title";
import CartContent from "./2-CartContent";
import OrderSummary from "./3-OrderSummary";
import Newsletter from "../shared/Newsletter";

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
          <LocationUser>Cart</LocationUser>
        </div>

        {/* Main Content */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <Title cartItems={cartItems} />

            {/* Cart Content */}

            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                {/* Cart Content */}
                <CartContent
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />

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
                <OrderSummary
                  promoInput={promoInput}
                  setPromoInput={setPromoInput}
                  setPromoError={setPromoError}
                  applyPromoCode={applyPromoCode}
                  promoApplied={promoApplied}
                  promoError={promoError}
                  total={total}
                  DELIVERY_FEE={DELIVERY_FEE}
                  discount={discount}
                  subtotal={subtotal}
                />
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </div>

      {/* Toast Notification */}
      {toast.show && <Toaster toast={toast} />}
    </>
  );
};

export default Cart;
