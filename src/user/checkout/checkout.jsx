import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80",
    },
    {
      id: 2,
      name: "Classic Fit Jeans",
      size: "32",
      color: "Blue",
      price: 215,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
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
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
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
        <div className="bg-muted dark:bg-gray-900 py-6 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm text-secondary">
              <Link to="/" className="hover:text-industrial-red transition-colors">Home</Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <Link to="/cart" className="hover:text-industrial-red transition-colors">Cart</Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-primary font-medium">Checkout</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
              <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                
                {/* Left Column: Forms */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Contact Information */}
                  <div className="bg-surface rounded-2xl border border-line p-6 shadow-sm animate-fade-up">
                    <h2 className="font-display text-xl font-semibold mb-6 text-primary">Contact Information</h2>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full px-4 py-3 rounded-xl"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-surface rounded-2xl border border-line p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.1s" }}>
                    <h2 className="font-display text-xl font-semibold mb-6 text-primary">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-primary mb-2">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="form-input w-full px-4 py-3 rounded-xl" placeholder="Street and Number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="form-input w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2">State</label>
                          <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="form-input w-full px-4 py-3 rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2">ZIP</label>
                          <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required className="form-input w-full px-4 py-3 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-surface rounded-2xl border border-line p-6 shadow-sm animate-fade-up" style={{ animationDelay: "0.2s" }}>
                    <h2 className="font-display text-xl font-semibold mb-6 text-primary">Payment Method</h2>
                    
                    <div className="space-y-4 mb-6">
                      <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-industrial-dark bg-muted' : 'border-line hover:bg-muted'}`}>
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-industrial-red focus:ring-industrial-red" />
                        <span className="font-medium text-primary">Credit / Debit Card</span>
                      </label>
                      <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-industrial-dark bg-muted' : 'border-line hover:bg-muted'}`}>
                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="h-4 w-4 text-industrial-red focus:ring-industrial-red" />
                        <span className="font-medium text-primary">PayPal</span>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2">Card Number</label>
                          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 1234 1234 1234" className="form-input w-full px-4 py-3 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">Expiry Date</label>
                            <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM / YY" className="form-input w-full px-4 py-3 rounded-xl" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">CVV</label>
                            <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" className="form-input w-full px-4 py-3 rounded-xl" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                  <div className="bg-surface rounded-2xl border border-line p-6 shadow-sm lg:sticky lg:top-24 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                    <h2 className="font-display text-xl font-semibold mb-6 text-primary">Order Summary</h2>

                    {/* Items List */}
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-industrial-dark text-white text-xs rounded-full flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate text-primary">{item.name}</h4>
                            <p className="text-xs text-secondary">Size: {item.size}</p>
                            <p className="text-sm font-semibold mt-1 text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex flex-col justify-center">
                             <button type="button" onClick={() => updateQuantity(item.id, 1)} className="text-secondary hover:text-primary text-xs">+</button>
                             <button type="button" onClick={() => updateQuantity(item.id, -1)} className="text-secondary hover:text-primary text-xs">-</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code */}
                    <div className="flex gap-2 mb-6">
                      <input type="text" placeholder="Promo Code" className="form-input flex-1 px-4 py-2 rounded-lg text-sm" />
                      <button type="button" className="px-4 py-2 bg-industrial-dark text-white text-sm rounded-lg hover:bg-industrial-dark/90 transition-colors">Apply</button>
                    </div>

                    {/* Totals */}
                    <div className="space-y-3 border-t border-line pt-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Subtotal</span>
                        <span className="text-primary">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Shipping</span>
                        <span className="text-primary">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      Place Order
                    </button>

                    <p className="text-xs text-secondary text-center mt-4">
                      Your payment information is processed securely.
                    </p>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </main>

      </div>
    </>
  );
};

export default Checkout;