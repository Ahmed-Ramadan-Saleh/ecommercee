import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// --- Data Constants ---
const NEW_ARRIVALS = [
  {
    id: 1,
    name: "T-Shirt with Tape Details",
    price: 120,
    rating: 4.5,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    badge: null,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 320,
    rating: 4.0,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    badge: "-25%",
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    rating: 4.8,
    reviews: 256,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    badge: null,
  },
  {
    id: 4,
    name: "Sleeve Striped T-Shirt",
    price: 130,
    originalPrice: 160,
    rating: 4.3,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    badge: "New",
  },
];

const TOP_SELLING = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 265,
    rating: 4.9,
    reviews: 342,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    badge: "-20%",
  },
  {
    id: 6,
    name: "Courage Graphic T-Shirt",
    price: 145,
    rating: 4.2,
    reviews: 187,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80",
    badge: null,
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 4.7,
    reviews: 421,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
    badge: "Hot",
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.6,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&q=80",
    badge: null,
  },
];

const STYLE_CATEGORIES = [
  {
    name: "Casual",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80",
  },
  {
    name: "Formal",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Party",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",
  },
  {
    name: "Gym",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "Absolutely love the quality! The fabric feels premium and the fit is perfect. Will definitely be ordering more.",
  },
  {
    id: 2,
    name: "Alex K.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Fast shipping and excellent customer service. The clothes exceeded my expectations. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma L.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    text: "Great selection of brands and styles. The website is easy to navigate and checkout was smooth.",
  },
];

// --- Helper Components ---

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          );
        }
        if (i === fullStars && hasHalf) {
          return (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" />
            </svg>
          );
        }
        return (
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
};

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

const Home = () => {
  // Scroll Reveal Effect
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

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>SHOP.CO - Find Your Style</title>
      </Helmet>

      <div className="bg-texture px-4">
        {/* Hero Section */}
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
                    <p className="text-sm text-secondary">
                      International Brands
                    </p>
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

        {/* New Arrivals */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10 reveal">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary">
                  New Arrivals
                </h2>
                <p className="text-secondary mt-2">
                  Latest additions to our collection
                </p>
              </div>
              <Link
                to="/category"
                className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-industrial-red transition-colors group"
              >
                View All
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {NEW_ARRIVALS.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Selling */}
        <section className="py-16 lg:py-24 bg-muted dark:bg-gray-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10 reveal">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary">
                  Top Selling
                </h2>
                <p className="text-secondary mt-2">
                  Most loved by our customers
                </p>
              </div>
              <Link
                to="/category"
                className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-industrial-red transition-colors group"
              >
                View All{" "}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {TOP_SELLING.map((product, index) => (
                <Link to="/detail" key={product.id}>
                  <ProductCard product={product} index={index} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Style */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 reveal">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary">
                Browse by Dress Style
              </h2>
              <p className="text-secondary mt-2">Find your perfect look</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {STYLE_CATEGORIES.map((category, index) => {
                const heights = [
                  "aspect-[3/4]",
                  "aspect-[4/5] lg:row-span-2",
                  "aspect-[4/5] lg:row-span-2",
                  "aspect-[3/4]",
                ];
                return (
                  <Link
                    to="/category"
                    key={category.name}
                    className={`${heights[index]} rounded-2xl overflow-hidden block reveal relative group`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 flex items-end p-6">
                      <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-24 bg-industrial-dark dark:bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.5" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 reveal">
              <h2 className="font-display text-3xl lg:text-4xl font-bold">
                What Our Customers Say
              </h2>
              <p className="text-secondary mt-2">
                Real reviews from real customers
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, index) => (
                <div
                  key={t.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 reveal"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
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
                  Subscribe to our newsletter and get 15% off your first order,
                  plus exclusive access to new arrivals and special offers.
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
      </div>
    </>
  );
};

export default Home;
