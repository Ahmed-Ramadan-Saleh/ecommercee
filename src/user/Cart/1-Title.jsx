import React from "react";

const Title = ({ cartItems }) => {
  return (
    <div className="mb-8 reveal">
      <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary">
        Your Cart
      </h1>
      <p className="text-secondary mt-2">
        You have {cartItems.length} item
        {cartItems.length !== 1 ? "s" : ""} in your cart
      </p>
    </div>
  );
};

export default Title;
