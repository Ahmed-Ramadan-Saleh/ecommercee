import React from "react";

const PaymentMethod = ({
  handleInputChange,
  formData,
  setPaymentMethod,
  paymentMethod,
}) => {
  return (
    <div
      className="bg-surface rounded-2xl border border-line p-6 shadow-sm animate-fade-up"
      style={{ animationDelay: "0.2s" }}
    >
      <h2 className="font-display text-xl font-semibold mb-6 text-primary">
        Payment Method
      </h2>

      <div className="space-y-4 mb-6">
        <label
          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "card" ? "border-industrial-dark bg-muted" : "border-line hover:bg-muted"}`}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="h-4 w-4 text-industrial-red focus:ring-industrial-red"
          />
          <span className="font-medium text-primary">Credit / Debit Card</span>
        </label>
        <label
          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "paypal" ? "border-industrial-dark bg-muted" : "border-line hover:bg-muted"}`}
        >
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
            className="h-4 w-4 text-industrial-red focus:ring-industrial-red"
          />
          <span className="font-medium text-primary">PayPal</span>
        </label>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 1234 1234 1234"
              className="form-input w-full px-4 py-3 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                placeholder="MM / YY"
                className="form-input w-full px-4 py-3 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="form-input w-full px-4 py-3 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
