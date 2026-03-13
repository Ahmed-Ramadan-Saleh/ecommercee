import React from "react";

const TableSection = ({
  filteredOrders,
  openDetail,
  StatusBadge,
  TableSection,
}) => {
  return (
    <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
      {/* 
           Responsive Table Strategy:
           1. Mobile (< sm): 'block' display turns table into a stack of cards.
           2. Desktop (>= sm): 'table' display shows standard table.
        */}
      <table className="w-full">
        {/* Desktop Header - Hidden on Mobile */}
        <thead className="hidden sm:table-header-group bg-muted border-b border-line">
          <tr>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Order ID
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Customer
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Date
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Amount
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Status
            </th>
            <th className="text-right px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body - Stacked on Mobile */}
        <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="block sm:table-row hover:bg-muted/50 transition-colors cursor-pointer 
                             /* Card styling for mobile */
                             p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none"
                onClick={() => openDetail(order)}
              >
                {/* Cell 1: Order ID */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Order ID
                  </span>
                  <span className="font-medium text-primary">{order.id}</span>
                </td>

                {/* Cell 2: Customer */}
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

                {/* Cell 3: Date */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Date
                  </span>
                  <span className="text-secondary">{order.date}</span>
                </td>

                {/* Cell 4: Amount */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Amount
                  </span>
                  <span className="font-medium text-primary">
                    ${order.amount.toFixed(2)}
                  </span>
                </td>

                {/* Cell 5: Status */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Status
                  </span>
                  <StatusBadge status={order.status} />
                </td>

                {/* Cell 6: Actions */}
                <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                  <button className="text-sm text-industrial-red hover:underline font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-12 text-secondary block"
              >
                No orders found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
