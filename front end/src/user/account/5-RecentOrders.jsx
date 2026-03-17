import React from "react";

const RecentOrders = ({ orders }) => {
  const getStatusBadge = (status) => {
    const classes = {
      Delivered: "badge-success",
      Shipped: "badge-success",
      Processing: "badge-warning",
      Pending: "badge-inactive", // Uses the inactive style for pending
    };
    return (
      <span className={`badge ${classes[status] || "badge-inactive"}`}>
        {status}
      </span>
    );
  };

  return (
    <div
      className="bg-surface rounded-2xl border border-line overflow-hidden animate-fade-up"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-center justify-between p-6 border-b border-line">
        <h2 className="font-semibold text-lg text-primary">Recent Orders</h2>
        <a
          href="#"
          className="text-sm font-medium text-industrial-red hover:text-industrial-red-hover transition-colors"
        >
          View All
        </a>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {["Order ID", "Date", "Items", "Total", "Status", "Action"].map(
                (header) => (
                  <th
                    key={header}
                    className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-6 py-3"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-line last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-primary">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-secondary">{order.date}</td>
                <td className="px-6 py-4 text-primary">{order.items} items</td>
                <td className="px-6 py-4 font-medium text-primary">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-industrial-red hover:text-industrial-red-hover font-medium transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-line">
        {orders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-primary">{order.id}</span>
              {getStatusBadge(order.status)}
            </div>
            <div className="flex items-center justify-between text-sm text-secondary">
              <span>{order.date}</span>
              <span>{order.items} items</span>
              <span className="font-medium text-primary">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <button className="mt-3 text-sm text-industrial-red font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
