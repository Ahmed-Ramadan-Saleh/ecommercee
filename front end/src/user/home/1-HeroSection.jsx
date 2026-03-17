import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="order-2 lg:order-1">
            <p
              className="text-sm font-medium text-industrial-red tracking-widest uppercase mb-4 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              New Collection 2024
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-6 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-primary">FIND CLOTHES</span>
              <br />
              <span className="text-industrial-red">THAT MATCHES</span>
              <br />
              <span className="text-primary">YOUR STYLE</span>
            </h1>
            <p
              className="text-secondary text-lg mb-8 max-w-md animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Browse through our curated collection of premium fashion from
              world-renowned brands. Quality meets style.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link to={"/category"}>
                <button className="btn-primary px-8 py-4 rounded-full text-sm font-semibold relative z-10">
                  Shop Now
                </button>
              </Link>
            </div>
            <div
              className="flex gap-8 mt-12 pt-8 border-t border-line animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div>
                <p className="font-display text-3xl lg:text-4xl font-bold text-primary">
                  200+
                </p>
                <p className="text-sm text-secondary">International Brands</p>
              </div>
              <div>
                <p className="font-display text-3xl lg:text-4xl font-bold text-primary">
                  2,000+
                </p>
                <p className="text-sm text-secondary">Premium Products</p>
              </div>
              <div>
                <p className="font-display text-3xl lg:text-4xl font-bold text-primary">
                  30,000+
                </p>
                <p className="text-sm text-secondary">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative animate-fade-in">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8E0D8] to-[#D4CCC4]">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Fashion model"
                className="w-full h-full object-cover"
              />
              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 bg-surface/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-industrial-red/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-industrial-red"
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
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      Verified Quality
                    </p>
                    <p className="text-xs text-secondary">100% Authentic</p>
                  </div>
                </div>
              </div>
              <div
                className="absolute -right-4 bottom-1/4 bg-surface/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      Top Rated
                    </p>
                    <p className="text-xs text-secondary">
                      4.9/5 (2.4k reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <div className="border-y border-line py-8">
        <div className="text-center">
          <p className="text-sm text-secondary mb-6">
            Trusted by world-class fashion brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
            {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map(
              (brand) => (
                <span
                  key={brand}
                  className="font-display text-2xl font-bold tracking-wider text-primary"
                >
                  {brand}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
