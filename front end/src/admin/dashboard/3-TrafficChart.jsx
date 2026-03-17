import React from "react";

const TrafficChart = ({chartRef}) => {
  return (
    <div
      className="lg:col-span-2 bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm animate-fade-up"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-primary">Traffic Overview</h2>
          <p className="text-sm text-secondary">
            Visitors vs Sales (Last 7 days)
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-2 text-secondary">
            <span className="w-3 h-3 rounded-full bg-industrial-red"></span>{" "}
            Sales
          </span>
          <span className="flex items-center gap-2 text-secondary">
            <span className="w-3 h-3 rounded-full bg-gray-800 dark:bg-white"></span>{" "}
            Visitors
          </span>
        </div>
      </div>
      {/* Responsive Height: h-48 on mobile, h-64 on desktop */}
      <canvas
        ref={chartRef}
        id="traffic-chart"
        className="w-full h-48 md:h-64"
      />
    </div>
  );
};

export default TrafficChart;
