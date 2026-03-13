import React from "react";

const Welcome = ({ user }) => {
  return (
    <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <h1 className="font-display text-2xl lg:text-3xl font-bold text-primary">
        Welcome back, {user.name.split(" ")[0]}!
      </h1>
      <p className="text-secondary mt-1">
        Here's what's happening with your account today.
      </p>
    </div>
  );
};

export default Welcome;
