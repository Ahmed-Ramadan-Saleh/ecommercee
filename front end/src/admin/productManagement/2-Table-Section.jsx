import React from "react";

const TableSection = ({
  filteredProducts,
  StatusBadge,
  openPanel,
  deleteProduct,
  TableSection

}) => {
  return (
    <div className="bg-surface rounded-xl border border-line overflow-hidden shadow-sm">
      <table className="w-full">
        {/* Desktop Header */}
        <thead className="hidden sm:table-header-group bg-muted border-b border-line">
          <tr>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Product
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              SKU
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Price
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Category
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
              Stock
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <tr
                key={p.id}
                className="block sm:table-row hover:bg-muted/50 transition-colors 
                                           p-4 sm:p-0 mb-4 sm:mb-0 border border-line sm:border-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none"
              >
                {/* Product Info */}
                <td className="block sm:table-cell py-2 sm:px-6 sm:py-4 w-full">
                  <div className="flex justify-between items-start sm:block">
                    <span className="sm:hidden text-xs font-medium text-secondary mb-1">
                      Product
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-primary">
                          {p.name}
                        </p>
                        <p className="text-xs text-secondary">{p.style}</p>
                      </div>
                    </div>
                  </div>
                </td>

                {/* SKU */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    SKU
                  </span>
                  <span className="text-secondary font-mono">{p.sku}</span>
                </td>

                {/* Price */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Price
                  </span>
                  <div className="text-right sm:text-left">
                    <span className="font-medium text-primary">
                      ${p.price.toFixed(2)}
                    </span>
                    {p.discount > 0 && (
                      <span className="text-xs text-secondary line-through ml-1">
                        ${(p.price * (1 + p.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </td>

                {/* Category */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Category
                  </span>
                  <span className="text-secondary">{p.category}</span>
                </td>

                {/* Stock */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4 text-sm">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Stock
                  </span>
                  <span className="font-medium text-primary">{p.stock}</span>
                </td>

                {/* Status */}
                <td className="flex justify-between items-center py-1 sm:table-cell sm:px-6 sm:py-4">
                  <span className="sm:hidden text-xs font-medium text-secondary">
                    Status
                  </span>
                  <StatusBadge stock={p.stock} />
                </td>

                {/* Actions */}
                <td className="flex justify-end items-center pt-2 sm:table-cell sm:px-6 sm:py-4 text-right">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openPanel(true, p)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary"
                      title="Edit"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-secondary hover:text-red-600"
                      title="Delete"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center py-12 text-secondary block"
              >
                No products found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
