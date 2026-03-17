import React from "react";

const LowStock = ({LOW_STOCK_DATA}) => {
  return (
    <div
      className="bg-surface rounded-xl border border-line p-4 md:p-6 shadow-sm animate-fade-up"
      style={{ animationDelay: "0.35s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-primary">Low Stock Alerts</h2>
        <span className="text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
          4 Items
        </span>
      </div>
      <div className="space-y-4">
        {LOW_STOCK_DATA.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-primary truncate">
                {item.name}
              </p>
              <p className="text-xs text-secondary">{item.stock} items left</p>
            </div>
            <span
              className={`badge ${item.stock <= 3 ? "badge-danger" : "badge-warning"}`}
            >
              {item.stock <= 3 ? "Critical" : "Low"}
            </span>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="block text-center text-sm font-medium text-industrial-red hover:text-industrial-red-hover mt-6 pt-4 border-t border-line transition-colors"
      >
        View All Products
      </a>
    </div>
  );
};

export default LowStock;
