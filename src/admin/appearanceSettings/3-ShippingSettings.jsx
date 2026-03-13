import React from "react";

const ShippingSettings = ({shippingRates}) => {
  return (
    <div className="animate-fade-in">
      <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-line gap-4">
          <div>
            <h3 className="font-semibold text-primary">Shipping Rates</h3>
            <p className="text-sm text-secondary mt-1">
              Configure shipping options for checkout
            </p>
          </div>
          <button className="btn-primary px-4 py-2 text-sm rounded-lg font-medium w-full sm:w-auto">
            Add Rate
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                  Condition
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-secondary uppercase">
                  Cost
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {shippingRates.map((rate) => (
                <tr
                  key={rate.id}
                  className="border-b border-line last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-sm text-primary">
                    {rate.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {rate.condition}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">
                    {rate.cost === 0 ? "Free" : `$${rate.cost.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-secondary hover:text-primary mr-3 font-medium transition-colors">
                      Edit
                    </button>
                    <button className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShippingSettings;
