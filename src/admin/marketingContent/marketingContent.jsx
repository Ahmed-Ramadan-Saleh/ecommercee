import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import TabsNavigation from "./1-TabsNavigation";
import PromoCodes from "./2-PromoCodes";
import Homepage from "./3-Homepage";
import Reviews from "./4-Reviews";
import SlideOver from "./5-Slide-over";

// --- Helper Component: StarRating ---
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4"
        fill={i < rating ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const MarketingContent = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState("coupons");
  const [isCouponPanelOpen, setIsCouponPanelOpen] = useState(false);

  // Data State
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "FIRST20",
      discount: "20%",
      uses: 1250,
      expiry: "Dec 31, 2024",
      status: "active",
    },
    {
      id: 2,
      code: "SUMMER50",
      discount: "50%",
      uses: 45,
      expiry: "Aug 31, 2024",
      status: "active",
    },
    {
      id: 3,
      code: "FLASH10",
      discount: "10%",
      uses: 100,
      expiry: "Jan 01, 2024",
      status: "expired",
    },
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Gradient T-Shirt",
      user: "Sarah M.",
      rating: 5,
      text: "Amazing quality! The fabric feels premium.",
      date: "2 days ago",
      status: "approved",
    },
    {
      id: 2,
      product: "Classic Jeans",
      user: "Mike T.",
      rating: 4,
      text: "Good fit but slightly long.",
      date: "1 day ago",
      status: "pending",
    },
    {
      id: 3,
      product: "Polo Shirt",
      user: "Jenny L.",
      rating: 5,
      text: "Perfect for summer!",
      date: "3 days ago",
      status: "pending",
    },
  ]);

  const [reviewFilter, setReviewFilter] = useState("all");

  // --- Handlers ---

  const toggleCouponPanel = () => setIsCouponPanelOpen(!isCouponPanelOpen);

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  const approveReview = (id) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
    );
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  // Filtered Reviews
  const filteredReviews = reviews.filter((r) => {
    if (reviewFilter === "pending") return r.status === "pending";
    if (reviewFilter === "approved") return r.status === "approved";
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Marketing & Content - SHOP.CO Admin</title>
      </Helmet>

      {/* 1: Tabs Navigation - Scrollable on mobile */}
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab 2: Promo Codes */}
      {activeTab === "coupons" && (
        <PromoCodes
          toggleCouponPanel={toggleCouponPanel}
          coupons={coupons}
          deleteCoupon={deleteCoupon}
        />
      )}

      {/* Tab 3: Homepage Settings */}
      {activeTab === "homepage" && <Homepage />}

      {/* Tab 4: Reviews */}
      {activeTab === "reviews" && (
        <Reviews
          setReviewFilter={setReviewFilter}
          reviewFilter={reviewFilter}
          reviews={reviews}
          filteredReviews={filteredReviews}
          StarRating={StarRating}
          approveReview={approveReview}
          deleteReview={deleteReview}
        />
      )}

      {/* 5: Slide-over Overlay */}
      <SlideOver
        toggleCouponPanel={toggleCouponPanel}
        isCouponPanelOpen={isCouponPanelOpen}
      />
    </>
  );
};

export default MarketingContent;
