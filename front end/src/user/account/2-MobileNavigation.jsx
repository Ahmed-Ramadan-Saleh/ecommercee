import React from "react";
import { Link } from "react-router-dom";

const MobileNavigation = () => {
  const arrayNav = ["Dashboard", "Orders", "Wishlist", "Addresses", "Settings"];
  return (
    <div className="lg:hidden mb-6 flex overflow-x-auto gap-2 pb-2">
      {arrayNav.map((item, idx) => (
        <Link
          key={item}
          to="#"
          className={`whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
            idx === 0
              ? "bg-industrial-dark text-white border-transparent"
              : "bg-surface text-secondary border-line hover:bg-muted"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default MobileNavigation;
