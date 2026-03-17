import React from "react";
import StarRating from "../shared/StarRating";

const Testimonials = ({ TESTIMONIALS }) => {
  return (
    <section className="py-16 lg:py-24 bg-industrial-dark dark:bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-3xl lg:text-4xl font-bold">
            What Our Customers Say
          </h2>
          <p className="text-secondary mt-2">
            Real reviews from real customers
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <StarRating rating={t.rating} />
                </div>
              </div>
              <p className="text-secondary text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
