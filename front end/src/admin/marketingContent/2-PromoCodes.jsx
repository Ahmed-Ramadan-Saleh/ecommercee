import React from "react";

const PromoCodes = ({ toggleCouponPanel, coupons, deleteCoupon }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-secondary hidden sm:block">
          Manage discount codes for your store.
        </p>
        <button
          onClick={toggleCouponPanel}
          className="btn-primary px-4 py-2 text-sm rounded-lg font-medium w-full sm:w-auto"
        >
          Create Promo Code
        </button>
      </div>
      <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
        {/* Responsive Table: Card on Mobile, Table on Desktop */}
        <table className="w-full">
          <thead className="hidden sm:table-header-group bg-muted border-b border-line">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                Code
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                Discount
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                Uses
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                Expiry
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-secondary uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group divide-y sm:divide-y-0 divide-line">
            {coupons.map((c) => (
              <tr
                key={c.id}
                className="block sm:table-row hover:bg-muted/50 transition-colors p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none"
              >
                {/* Code */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Code
                  </span>
                  <span className="font-mono font-medium text-primary">
                    {c.code}
                  </span>
                </td>

                {/* Discount */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Discount
                  </span>
                  <span className="text-primary">{c.discount}</span>
                </td>

                {/* Uses */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Uses
                  </span>
                  <span className="text-secondary">{c.uses}</span>
                </td>

                {/* Expiry */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Expiry
                  </span>
                  <span className="text-secondary">{c.expiry}</span>
                </td>

                {/* Status */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Status
                  </span>
                  <span
                    className={`badge ${c.status === "active" ? "badge-success" : "badge-inactive"}`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                  <button
                    onClick={() => deleteCoupon(c.id)}
                    className="text-sm text-secondary hover:text-red-500 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromoCodes;
