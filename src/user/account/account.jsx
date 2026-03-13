import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LocationUser from "../shared/LocationUser";
import SidebarDesktop from "./1-SidebarDesktop";
import MobileNavigation from "./2-MobileNavigation";
import Welcome from "./3-Welcome";
import StatsCards from "./4-StatsCards";
import RecentOrders from "./5-RecentOrders";
import QuickActions from "./6-QuickActions";

const Account = () => {
  // --- Data ---
  const orders = [
    {
      id: "#ORD-2024001",
      date: "Jan 15, 2024",
      items: 3,
      total: 245.0,
      status: "Delivered",
    },
    {
      id: "#ORD-2024002",
      date: "Jan 18, 2024",
      items: 1,
      total: 89.0,
      status: "Shipped",
    },
    {
      id: "#ORD-2024003",
      date: "Jan 20, 2024",
      items: 2,
      total: 156.0,
      status: "Processing",
    },
    {
      id: "#ORD-2024004",
      date: "Jan 22, 2024",
      items: 4,
      total: 320.0,
      status: "Delivered",
    },
    {
      id: "#ORD-2024005",
      date: "Jan 25, 2024",
      items: 2,
      total: 178.0,
      status: "Pending",
    },
  ];

  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    initials: "JD",
  };

  // --- Effects ---
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
  }, []);

  return (
    <>
      <Helmet>
        <title>My Account - SHOP.CO</title>
      </Helmet>

      <div className="bg-texture px-4">
        {/* Location User */}
        <LocationUser>Account</LocationUser>

        {/* Main Content */}
        <main className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Sidebar (Desktop) */}
              <SidebarDesktop user={user} />

              {/* Mobile Navigation */}
              <MobileNavigation />

              {/* Main Area */}
              <div className="lg:col-span-9 space-y-6">
                {/* Welcome */}
                <Welcome user={user} />

                {/* Stats Cards */}
                <StatsCards />

                {/* Recent Orders */}
                <RecentOrders orders={orders} />

                {/* Quick Actions (Address/Payment) */}
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Account;
