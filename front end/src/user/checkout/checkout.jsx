import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LocationUser from "../shared/LocationUser";
import ContactInformation from "./1-ContactInformation";
import ShippingAddress from "./2-ShippingAddress";
import PaymentMethod from "./3-PaymentMethod";
import OrderSummary from "./4-OrderSummary";

const Checkout = () => {
  // Mock Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-Shirt",
      size: "Large",
      color: "White",
      price: 145,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80",
    },
    {
      id: 2,
      name: "Classic Fit Jeans",
      size: "32",
      color: "Blue",
      price: 215,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! (Demo)");
  };

  return (
    <>
      <Helmet>
        <title>Checkout - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture px-4">
        {/* Breadcrumb */}
        <LocationUser>Checkout</LocationUser>

        {/* Main Content */}
        <main className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
              <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                {/* Left Column: Forms */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Contact Information */}
                  <ContactInformation
                    formData={formData}
                    handleInputChange={handleInputChange}
                  />

                  {/* Shipping Address */}
                  <ShippingAddress
                    handleInputChange={handleInputChange}
                    formData={formData}
                  />

                  {/* Payment Method */}
                  <PaymentMethod
                    handleInputChange={handleInputChange}
                    formData={formData}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                  />
                </div>

                {/* Right Column: Order Summary */}

                <OrderSummary
                  cartItems={cartItems}
                  shipping={shipping}
                  subtotal={subtotal}
                  updateQuantity={updateQuantity}
                  total={total}
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
