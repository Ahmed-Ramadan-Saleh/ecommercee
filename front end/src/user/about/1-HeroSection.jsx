import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-muted dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <span className="inline-block px-4 py-1.5 bg-surface dark:bg-gray-800 rounded-full text-sm font-medium text-industrial-red mb-6 shadow-sm">
            Established 2020
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
            Redefining Fashion for the Modern World
          </h1>
          <p className="text-lg text-secondary mb-8">
            We believe style shouldn't compromise on comfort or conscience.
            SHOP.CO is dedicated to bringing you curated collections that tell a
            story.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/category"
              className="btn-primary px-8 py-3 rounded-full text-sm font-semibold relative z-10"
            >
              Shop Collection
            </Link>
            <Link
              to="/contact"
              className="btn-secondary px-8 py-3 rounded-full text-sm font-semibold border-line"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Shape */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-surface dark:bg-gray-900"
        style={{ clipPath: "ellipse(70% 100% at 50% 100%)" }}
      ></div>
    </section>
  );
};

export default HeroSection;
