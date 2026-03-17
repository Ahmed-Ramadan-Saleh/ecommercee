import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import HeroSection from "./1-HeroSection";
import NewArrivals from "./2-NewArrivals";
import TopSelling from "./3-TopSelling";
import BrowsebyStyle from "./4-BrowsebyStyle";
import Testimonials from "./5-Testimonials";
import Newsletter from "../shared/Newsletter";

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
        <HeroSection />

        {/* New Arrivals */}
        <NewArrivals NEW_ARRIVALS={NEW_ARRIVALS} />

        {/* Top Selling */}
        <TopSelling TOP_SELLING={TOP_SELLING} />

        {/* Browse by Style */}
        <BrowsebyStyle STYLE_CATEGORIES={STYLE_CATEGORIES} />

        {/* Testimonials */}
        <Testimonials TESTIMONIALS={TESTIMONIALS} />

        {/* Newsletter */}
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
