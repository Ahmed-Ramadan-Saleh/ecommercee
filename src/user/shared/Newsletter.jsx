import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-industrial-dark dark:bg-gray-900 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden reveal">
          <div className="absolute top-0 left-0 w-64 h-64 bg-industrial-red/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-industrial-red/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-secondary max-w-md mx-auto mb-8">
              Subscribe to our newsletter and get 15% off your first order, plus
              exclusive access to new arrivals and special offers.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-industrial-red transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-industrial-red hover:bg-industrial-red-hover text-white rounded-full font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-secondary mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
