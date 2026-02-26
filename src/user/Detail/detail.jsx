import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./detail.css"; // Assuming custom CSS animations are here

// --- Data Constants ---
const COLORS = [
  { id: 1, name: "Heather Grey", hex: "#9E9E9E" },
  { id: 2, name: "Deep Black", hex: "#1A1A1A" },
  { id: 3, name: "Navy Blue", hex: "#1E3A5F" },
  { id: 4, name: "Forest Green", hex: "#2D5A4A" },
  { id: 5, name: "Burgundy", hex: "#722F37" },
];

const SIZES = [
  { id: 1, label: "XS", available: true },
  { id: 2, label: "S", available: true },
  { id: 3, label: "M", available: true },
  { id: 4, label: "L", available: true },
  { id: 5, label: "XL", available: false },
  { id: 6, label: "XXL", available: true },
];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Perfect fit and amazing quality!",
    text: "I absolutely love this t-shirt! The fabric is soft and breathable, and the graphic design is even better in person. Fits true to size. Will definitely be buying more colors.",
    helpful: 24,
  },
  {
    id: 2,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Best graphic tee I own",
    text: "The quality exceeded my expectations. The print is durable and hasnt faded after multiple washes. The fit is relaxed but not too loose. Highly recommend!",
    helpful: 18,
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    date: "2 weeks ago",
    verified: true,
    title: "Great shirt, runs slightly large",
    text: "Love the design and quality, but I found it runs a bit large. I usually wear M but could have sized down to S. Still a great purchase!",
    helpful: 12,
  },
];

const SIMILAR_PRODUCTS = [
  { id: 1, name: "Vintage Logo T-Shirt", price: 95, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80", badge: null },
  { id: 2, name: "Essential Crew Tee", price: 75, originalPrice: 95, rating: 4.8, reviews: 289, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80", badge: "-21%" },
  { id: 3, name: "Artistic Print Tee", price: 110, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80", badge: "New" },
  { id: 4, name: "Minimal Design Shirt", price: 85, rating: 4.9, reviews: 203, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80", badge: null },
];

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
];

// --- Helper Component: StarRating ---
const StarRating = ({ rating, className = "w-4 h-4" }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <svg key={i} className={`${className} star-filled`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
        }
        if (i === fullStars && hasHalf) {
          return <svg key={i} className={`${className} star-filled`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/></svg>;
        }
        return <svg key={i} className={`${className} star-empty`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
      })}
    </div>
  );
};

const Detail = () => {
  // --- State ---
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]); // M
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(3);
  const [mainImage, setMainImage] = useState(PRODUCT_IMAGES[0]);
  const [activeAccordion, setActiveAccordion] = useState("desc-content"); // Default open
  const [isAdding, setIsAdding] = useState(false);

  // --- Effects ---
  
  // Scroll Reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Handlers ---

  const handleQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity);
    setIsAdding(true);
    
    setTimeout(() => setIsAdding(false), 1500);
  };

  const toggleAccordion = (id) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Helmet>
        <title>One Life Graphic T-Shirt - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture">


        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-[#8A8A8A]" aria-label="Breadcrumb">
            <a href="#" className="hover:text-[#C45C3E] transition-colors">Home</a>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <a href="#" className="hover:text-[#C45C3E] transition-colors">Shop</a>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <a href="#" className="hover:text-[#C45C3E] transition-colors">T-Shirts</a>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-[#1A1A1A]">One Life Graphic T-Shirt</span>
          </nav>
        </div>

        {/* Product Detail Section */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Product Images */}
              <div className="space-y-4 animate-fade-up">
                <div className="aspect-square bg-[#F0F0ED] rounded-3xl overflow-hidden relative">
                  <img
                    src={mainImage}
                    alt="Product"
                    className="product-image-main w-full h-full object-cover cursor-zoom-in"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#C45C3E] text-white text-sm font-medium rounded-full">-40%</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {PRODUCT_IMAGES.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`thumbnail aspect-square bg-[#F0F0ED] rounded-xl overflow-hidden border-2 ${mainImage === img ? "border-[#1A1A1A]" : "border-transparent"}`}
                    >
                      <img src={img.replace("w=800", "w=200")} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <div>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">One Life Graphic T-Shirt</h1>
                  <div className="flex items-center gap-3">
                    <StarRating rating={4.5} />
                    <span className="text-sm text-[#8A8A8A]">4.5 (3.2k Reviews)</span>
                    <span className="text-sm text-[#4CAF50] font-medium">In Stock</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">$260</span>
                  <span className="text-xl text-[#8A8A8A] line-through">$300</span>
                  <span className="px-2 py-1 bg-[#C45C3E]/10 text-[#C45C3E] text-sm font-medium rounded">-40%</span>
                </div>

                <p className="text-[#8A8A8A] leading-relaxed">
                  This graphic t-shirt turns heads with its bold "One Life" design. Made from premium 100% organic cotton for ultimate comfort and style. Perfect for casual outings or making a statement.
                </p>

                {/* Color Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Color</span>
                    <span className="text-sm text-[#8A8A8A]">{selectedColor.name}</span>
                  </div>
                  <div className="flex gap-3">
                    {COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`color-swatch w-10 h-10 rounded-full border-2 ${selectedColor.id === color.id ? "border-[#1A1A1A] ring-2 ring-offset-2 ring-[#1A1A1A]" : "border-transparent"}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Size</span>
                    <button className="text-sm text-[#C45C3E] hover:underline">Size Guide</button>
                  </div>
                  <div className="flex gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => size.available && setSelectedSize(size)}
                        disabled={!size.available}
                        className={`size-btn w-12 h-12 border rounded-lg font-medium text-sm transition-colors
                          ${selectedSize.id === size.id ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "border-[#E8E8E5] hover:border-[#1A1A1A]"}
                          ${!size.available ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-4">
                  <div className="flex items-center border border-[#E8E8E5] rounded-full">
                    <button onClick={() => handleQuantity(-1)} className="qty-btn w-12 h-12 flex items-center justify-center rounded-l-full" aria-label="Decrease quantity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button onClick={() => handleQuantity(1)} className="qty-btn w-12 h-12 flex items-center justify-center rounded-r-full" aria-label="Increase quantity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    style={{ background: isAdding ? "#4CAF50" : undefined }}
                    className="btn-primary flex-1 px-8 py-3 rounded-full font-semibold relative z-10"
                  >
                    {isAdding ? "Added!" : "Add to Cart"}
                  </button>
                </div>

                {/* Info Cards (Static for brevity, same as original) */}
                <div className="space-y-3 pt-4 border-t border-[#E8E8E5]">
                   {/* Info cards code omitted for brevity, structure unchanged */}
                   <div className="flex items-center gap-4 p-4 bg-[#F0F0ED] rounded-xl">
                     <svg className="w-6 h-6 text-[#C45C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                     <div><p className="font-medium text-sm">Free Shipping</p><p className="text-xs text-[#8A8A8A]">On orders over $100</p></div>
                   </div>
                </div>
              </div>
            </div>

            {/* Product Details Accordion */}
            <div className="mt-12 lg:mt-16 border-t border-[#E8E8E5] pt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  { id: "desc-content", title: "Product Details", content: "Premium quality graphic t-shirt..." },
                  { id: "ship-content", title: "Shipping Info", content: "We offer fast and reliable shipping..." },
                  { id: "return-content", title: "Returns", content: "Not satisfied? No problem!..." }
                ].map((section) => (
                  <div key={section.id} className="lg:col-span-1 reveal">
                    <button
                      onClick={() => toggleAccordion(section.id)}
                      className="accordion-btn w-full flex items-center justify-between py-4 border-b border-[#E8E8E5] text-left"
                    >
                      <span className="font-display text-xl font-semibold">{section.title}</span>
                      <svg className={`accordion-icon w-5 h-5 transition-transform ${activeAccordion === section.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === section.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="py-4 text-[#8A8A8A]">{section.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12 lg:py-16 bg-[#F0F0ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8 reveal">
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold">Customer Reviews</h2>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={4.5} className="w-5 h-5" />
                  <span className="text-[#8A8A8A]">Based on 3,247 reviews</span>
                </div>
              </div>
              <button className="hidden sm:block btn-secondary px-6 py-2 rounded-full text-sm font-medium">Write a Review</button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* Review Stats */}
              <div className="md:col-span-1 bg-white rounded-2xl p-6 reveal">
                <div className="text-center">
                  <p className="font-display text-5xl font-bold">4.5</p>
                  <div className="flex justify-center mt-2"><StarRating rating={4.5} /></div>
                  <p className="text-sm text-[#8A8A8A] mt-2">3,247 reviews</p>
                </div>
                {/* Progress bars omitted for brevity */}
              </div>

              {/* Review List */}
              <div className="md:col-span-3 space-y-4">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="review-card bg-white rounded-2xl p-6 reveal">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <StarRating rating={review.rating} className="w-3 h-3" />
                              {review.verified && (
                                <span className="text-xs text-[#4CAF50] flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-[#8A8A8A]">{review.date}</span>
                        </div>
                        <h5 className="font-medium mt-3">{review.title}</h5>
                        <p className="text-sm text-[#8A8A8A] mt-2 leading-relaxed">{review.text}</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E8E8E5]">
                          <button className="text-sm text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8 reveal">
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold">You May Also Like</h2>
                <p className="text-[#8A8A8A] mt-1">Similar styles you might enjoy</p>
              </div>
              <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-[#C45C3E] transition-colors group">
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {SIMILAR_PRODUCTS.map((product, index) => (
                <a href="#" key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0ED]">
                    <img src={product.image} alt={product.name} className="product-image w-full h-full object-cover" />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 text-white text-xs font-medium rounded-full ${product.badge.includes("%") ? "bg-[#C45C3E]" : "bg-[#1A1A1A]"}`}>{product.badge}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm lg:text-base mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-[#8A8A8A]">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">${product.price}</span>
                      {product.originalPrice && <span className="text-sm text-[#8A8A8A] line-through">${product.originalPrice}</span>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Detail;