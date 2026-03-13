import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LocationUser from "../shared/LocationUser";
import ProductDetail from "./1-ProductDetail";
import SimilarProducts from "./2-SimilarProducts";
import CustomerReviews from "./3-CustomerReviews";

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
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
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
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
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
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    date: "2 weeks ago",
    verified: true,
    title: "Great shirt, runs slightly large",
    text: "Love the design and quality, but I found it runs a bit large. I usually wear M but could have sized down to S. Still a great purchase!",
    helpful: 12,
  },
];

const SIMILAR_PRODUCTS = [
  {
    id: 1,
    name: "Vintage Logo T-Shirt",
    price: 95,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    badge: null,
  },
  {
    id: 2,
    name: "Essential Crew Tee",
    price: 75,
    originalPrice: 95,
    rating: 4.8,
    reviews: 289,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    badge: "-21%",
  },
  {
    id: 3,
    name: "Artistic Print Tee",
    price: 110,
    rating: 4.6,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80",
    badge: "New",
  },
  {
    id: 4,
    name: "Minimal Design Shirt",
    price: 85,
    rating: 4.9,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    badge: null,
  },
];

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
];

// --- Helper Component: StarRating ---
const StarRating = ({ rating, className = "w-4 h-4" }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg
              key={i}
              className={`${className} text-yellow-400`}
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
              className={`${className} text-yellow-400`}
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
            className={`${className} text-gray-300 dark:text-gray-600`}
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
      <div className="bg-texture px-4">
        {/* Breadcrumb */}
        <LocationUser>
          <nav
            className="flex items-center text-sm text-secondary"
            aria-label="Breadcrumb"
          >
            <Link
              to="/category"
              className="hover:text-industrial-red transition-colors"
            >
              Shop
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
            <Link
              to="/category"
              className="hover:text-industrial-red transition-colors"
            >
              T-Shirts
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
            <span className="text-primary">One Life Graphic T-Shirt</span>
          </nav>
        </LocationUser>

        {/* Product Detail */}
        <ProductDetail
          toggleAccordion={toggleAccordion}
          isAdding={isAdding}
          handleAddToCart={handleAddToCart}
          handleQuantity={handleQuantity}
          quantity={quantity}
          selectedSize={selectedSize}
          SIZES={SIZES}
          setSelectedColor={setSelectedColor}
          COLORS={COLORS}
          selectedColor={selectedColor}
          StarRating={StarRating}
          setMainImage={setMainImage}
          PRODUCT_IMAGES={PRODUCT_IMAGES}
          mainImage={mainImage}
          setSelectedSize={setSelectedSize}
          activeAccordion={activeAccordion}
        />

        {/* Similar Products */}
        <SimilarProducts
          StarRating={StarRating}
          SIMILAR_PRODUCTS={SIMILAR_PRODUCTS}
        />

        {/* Customer Reviews */}
        <CustomerReviews REVIEWS={REVIEWS} StarRating={StarRating} />
      </div>
    </>
  );
};

export default Detail;
