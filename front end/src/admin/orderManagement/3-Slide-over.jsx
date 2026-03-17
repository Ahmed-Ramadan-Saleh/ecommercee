import React from "react";

const SlideOver = ({
  StatusBadge,
  selectedOrder,
  discount,
  shipping,
  subtotal,
  closePanel,
  isPanelOpen,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closePanel}
      />

      {/* Order Detail Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedOrder && (
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-4 md:p-6 border-b border-line sticky top-0 bg-surface z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary">
                  Order {selectedOrder.id}
                </h2>
                <button
                  onClick={closePanel}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary hover:text-primary"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">
                  {selectedOrder.date} at 10:30 AM
                </span>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {/* Status Update Actions */}
              <div className="bg-muted p-4 rounded-xl flex flex-wrap gap-3 items-center">
                <span className="text-sm font-medium text-primary w-full sm:w-auto">
                  Update Status:
                </span>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-line hover:bg-muted transition-colors text-primary">
                    Processing
                  </button>
                  <button className="btn-primary px-3 py-1.5 text-xs rounded-lg">
                    Mark Shipped
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                    Mark Delivered
                  </button>
                </div>
              </div>

              {/* Customer & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                    Customer
                  </h3>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="font-semibold text-primary">
                      {selectedOrder.customer}
                    </p>
                    <p className="text-sm text-secondary mt-1">
                      {selectedOrder.email}
                    </p>
                    <p className="text-sm text-secondary">
                      {selectedOrder.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                    Shipping Address
                  </h3>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-primary whitespace-pre-line">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                  Order Items
                </h3>
                <div className="border border-line rounded-xl overflow-hidden divide-y divide-line">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex p-4 gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-primary">
                          {item.name}
                        </p>
                        <p className="text-xs text-secondary">{item.variant}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm text-primary">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-secondary">x{item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                    Payment
                  </h3>
                  <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-6 bg-industrial-dark rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {selectedOrder.payment.method === "Visa"
                        ? "VISA"
                        : selectedOrder.payment.method
                            .substring(0, 4)
                            .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">
                        {selectedOrder.payment.method} ending in{" "}
                        {selectedOrder.payment.last4 || "****"}
                      </p>
                      <p className="text-xs text-secondary">
                        Paid on {selectedOrder.date}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                    Order Summary
                  </h3>
                  <div className="bg-muted rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-secondary">
                      <span>Subtotal</span>{" "}
                      <span className="text-primary">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Shipping</span>{" "}
                      <span className="text-primary">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Discount</span>{" "}
                      <span className="text-green-600">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-line pt-2 mt-2 flex justify-between font-bold text-base">
                      <span className="text-primary">Total</span>{" "}
                      <span className="text-primary">
                        ${(subtotal + shipping - discount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-line bg-muted flex justify-between gap-3 sticky bottom-0">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-line hover:bg-surface transition-colors flex items-center gap-2 text-primary">
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
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                <span className="hidden sm:inline">Print Invoice</span>
                <span className="sm:hidden">Print</span>
              </button>
              <button className="btn-primary px-4 py-2 text-sm rounded-lg flex-1 sm:flex-none text-center">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SlideOver;
