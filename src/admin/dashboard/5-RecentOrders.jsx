import React from "react";

const RecentOrders = ({
  ORDERS_DATA,
  getStatusBadge
}) => {
  return (
    <div
      className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm animate-fade-up"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-line">
        <h2 className="font-semibold text-primary">Recent Orders</h2>
        <a
          href="#"
          className="text-sm font-medium text-industrial-red hover:text-industrial-red-hover transition-colors"
        >
          View All Orders
        </a>
      </div>

      {/* Table: Block on Mobile, Table on Desktop */}
      <table className="w-full">
        <thead className="hidden sm:table-header-group bg-muted text-xs font-semibold text-secondary uppercase tracking-wider">
          <tr>
            <th className="text-left px-6 py-3">Order ID</th>
            <th className="text-left px-6 py-3">Customer</th>
            <th className="text-left px-6 py-3">Products</th>
            <th className="text-left px-6 py-3">Amount</th>
            <th className="text-left px-6 py-3">Status</th>
            <th className="text-right px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
          {ORDERS_DATA.map((order) => (
            <tr
              key={order.id}
              className="block sm:table-row hover:bg-muted/50 transition-colors last:border-0 p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none"
            >
              {/* Order ID */}
              <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                <span className="sm:hidden text-xs font-medium text-secondary">
                  Order ID
                </span>
                <span className="font-medium text-primary">{order.id}</span>
              </td>

              {/* Customer */}
              <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                <span className="sm:hidden text-xs font-medium text-secondary">
                  Customer
                </span>
                <div className="text-right sm:text-left">
                  <p className="text-sm font-medium text-primary">
                    {order.customer}
                  </p>
                  <p className="text-xs text-secondary">{order.email}</p>
                </div>
              </td>

              {/* Products */}
              <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                <span className="sm:hidden text-xs font-medium text-secondary">
                  Products
                </span>
                <span className="text-secondary">{order.products}</span>
              </td>

              {/* Amount */}
              <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                <span className="sm:hidden text-xs font-medium text-secondary">
                  Amount
                </span>
                <span className="font-medium text-primary">
                  ${order.amount.toFixed(2)}
                </span>
              </td>

              {/* Status */}
              <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                <span className="sm:hidden text-xs font-medium text-secondary">
                  Status
                </span>
                {getStatusBadge(order.status)}
              </td>

              {/* Action */}
              <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                <button className="text-sm text-industrial-red hover:underline font-medium">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
