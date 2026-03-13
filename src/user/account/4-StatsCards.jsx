import React from "react";

const StatsCards = () => {
  const arrayStatus = [
    {
      label: "Total Orders",
      value: "24",
      color: "bg-industrial-dark/10 dark:bg-white/10",
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
      color: "bg-yellow-100 dark:bg-yellow-900/30",
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
      color: "bg-industrial-red/10",
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
      color: "bg-green-100 dark:bg-green-900/30",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  ];

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
      style={{ animationDelay: "0.15s" }}
    >
      {arrayStatus.map((stat, idx) => (
        <div
          key={idx}
          className="bg-surface rounded-2xl border border-line p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-secondary">{stat.label}</span>
            <div
              className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}
            >
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {stat.icon}
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-primary">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
