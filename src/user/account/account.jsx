import React, {  useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./account.css"; // Assuming your custom CSS (animations, custom badges, etc.) is here
import { Link } from "react-router-dom";

const Account = () => {
  // --- State Management ---

  // Refs for handling outside clicks

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



  // Scroll reveal logic (using Intersection Observer)
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
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  // --- Handlers ---




  // --- Helper Components ---

  const getStatusBadge = (status) => {
    const classes = {
      Delivered: "badge-success",
      Shipped: "badge-success",
      Processing: "badge-warning",
      Pending: "badge-muted",
    };
    return (
      <span className={`badge ${classes[status] || "badge-muted"}`}>
        {status}
      </span>
    );
  };

  const SidebarLink = ({ href, icon, children, isActive }) => (
    <a
      href={href}
      className={`sidebar-link flex items-center gap-3 px-6 py-3 text-[#8A8A8A] ${isActive ? "active" : ""}`}
    >
      {icon}
      {children}
    </a>
  );

  return (
    <>
      <Helmet>
        <title>My Account - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav
            className="flex items-center text-sm text-[#8A8A8A]"
            aria-label="Breadcrumb"
          >
            <a href="#" className="hover:text-[#C45C3E] transition-colors">
              Home
            </a>
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
            <span className="text-[#1A1A1A]">My Account</span>
          </nav>
        </div>

        {/* Main Content */}
        <main className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Sidebar (Desktop) */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden animate-fade-up">
                  {/* User Info */}
                  <div className="p-6 border-b border-[#E8E8E5]">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full avatar flex items-center justify-center text-white font-bold text-lg">
                        {user.initials}
                      </div>
                      <div>
                        <h2 className="font-semibold">{user.name}</h2>
                        <p className="text-sm text-[#8A8A8A]">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="py-4">
                    <SidebarLink
                      href="#"
                      isActive
                      icon={
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
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                      }
                    >
                      Dashboard
                    </SidebarLink>
                    <SidebarLink
                      href="#"
                      icon={
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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      }
                    >
                      Orders
                    </SidebarLink>
                    <SidebarLink
                      href="#"
                      icon={
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
                      }
                    >
                      Wishlist
                    </SidebarLink>
                    <SidebarLink
                      href="#"
                      icon={
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      }
                    >
                      Addresses
                    </SidebarLink>
                    <SidebarLink
                      href="#"
                      icon={
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
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      }
                    >
                      Payment Methods
                    </SidebarLink>
                    <SidebarLink
                      href="#"
                      icon={
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      }
                    >
                      Account Settings
                    </SidebarLink>
                  </nav>

                  {/* Logout */}
                  <div className="p-4 border-t border-[#E8E8E5]">
                  <Link to={"/signin"}>
                  
                  
                  
                    <button
                  
                      className="flex items-center gap-3 w-full px-2 py-2 text-[#C45C3E] hover:bg-[#C45C3E]/5 rounded-lg transition-colors"
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </Link>
                  
                  </div>
                </div>
              </aside>

              {/* Mobile Navigation */}
              <div className="lg:hidden mb-6 sidebar-mobile animate-fade-up flex overflow-x-auto gap-2">
                {[
                  "Dashboard",
                  "Orders",
                  "Wishlist",
                  "Addresses",
                  "Settings",
                ].map((item, idx) => (
                  <a
                    key={item}
                    href="#"
                    className={`sidebar-link whitespace-nowrap px-4 py-2 rounded-full border border-[#E8E8E5] ${idx === 0 ? "active bg-[#1A1A1A] text-white" : ""}`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Main Area */}
              <div className="lg:col-span-9 space-y-6">
                {/* Welcome */}
                <div
                  className="animate-fade-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  <h1 className="font-display text-2xl lg:text-3xl font-bold">
                    Welcome back, {user.name.split(" ")[0]}!
                  </h1>
                  <p className="text-[#8A8A8A] mt-1">
                    Here's what's happening with your account today.
                  </p>
                </div>

                {/* Stats Cards */}
                <div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
                  style={{ animationDelay: "0.15s" }}
                >
                  {[
                    {
                      label: "Total Orders",
                      value: "24",
                      color: "bg-[#1A1A1A]/5",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      ),
                    },
                    {
                      label: "Pending",
                      value: "2",
                      color: "bg-[#FFA726]/10",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      ),
                    },
                    {
                      label: "Wishlist",
                      value: "8",
                      color: "bg-[#C45C3E]/10",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      ),
                    },
                    {
                      label: "Reward Points",
                      value: "1,250",
                      color: "bg-[#4CAF50]/10",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      ),
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="stat-card bg-white rounded-2xl border border-[#E8E8E5] p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-[#8A8A8A]">
                          {stat.label}
                        </span>
                        <div
                          className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {stat.icon}
                          </svg>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div
                  className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden animate-fade-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="flex items-center justify-between p-6 border-b border-[#E8E8E5]">
                    <h2 className="font-semibold text-lg">Recent Orders</h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-[#C45C3E] hover:text-[#A84A30] transition-colors"
                    >
                      View All
                    </a>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F0F0ED]">
                        <tr>
                          {[
                            "Order ID",
                            "Date",
                            "Items",
                            "Total",
                            "Status",
                            "Action",
                          ].map((header) => (
                            <th
                              key={header}
                              className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider px-6 py-3"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="order-row border-b border-[#E8E8E5] last:border-0"
                          >
                            <td className="px-6 py-4 font-medium">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 text-[#8A8A8A]">
                              {order.date}
                            </td>
                            <td className="px-6 py-4">{order.items} items</td>
                            <td className="px-6 py-4 font-medium">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              {getStatusBadge(order.status)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-sm text-[#C45C3E] hover:text-[#A84A30] font-medium transition-colors">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden divide-y divide-[#E8E8E5]">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 order-row">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{order.id}</span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center justify-between text-sm text-[#8A8A8A]">
                          <span>{order.date}</span>
                          <span>{order.items} items</span>
                          <span className="font-medium text-[#1A1A1A]">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                        <button className="mt-3 text-sm text-[#C45C3E] font-medium">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions (Address/Payment) */}
                <div
                  className="grid md:grid-cols-2 gap-4 animate-fade-up"
                  style={{ animationDelay: "0.25s" }}
                >
                  {/* Address Card */}
                  <div className="bg-white rounded-2xl border border-[#E8E8E5] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold">Default Address</h3>
                      <a
                        href="#"
                        className="text-sm text-[#C45C3E] hover:text-[#A84A30] transition-colors"
                      >
                        Edit
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-[#8A8A8A] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="text-sm">
                        <p className="font-medium">John Doe</p>
                        <p className="text-[#8A8A8A] mt-1">
                          123 Fashion Street, Apt 4B
                        </p>
                        <p className="text-[#8A8A8A]">New York, NY 10001</p>
                        <p className="text-[#8A8A8A]">United States</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Card */}
                  <div className="bg-white rounded-2xl border border-[#E8E8E5] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold">Default Payment</h3>
                      <a
                        href="#"
                        className="text-sm text-[#C45C3E] hover:text-[#A84A30] transition-colors"
                      >
                        Edit
                      </a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-8 bg-[#1A1A1A] rounded flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-[#8A8A8A]">Expires 12/2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Account;
