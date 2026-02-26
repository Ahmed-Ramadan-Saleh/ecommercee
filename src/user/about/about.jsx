import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./about.css"; // Custom CSS for specific animations if needed

const About = () => {
  // Team Data
  const teamMembers = [
    { name: "Alex Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
    { name: "Sarah Mitchell", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
    { name: "Michael Chen", role: "Head of Product", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
    { name: "Emily Davis", role: "Marketing Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
  ];

  // Values Data
  const coreValues = [
    { title: "Quality First", description: "We source only the finest materials to ensure every piece feels premium and lasts for years.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { title: "Sustainable Fashion", description: "Committed to ethical practices and reducing our environmental footprint at every step.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Customer Centric", description: "Your satisfaction is our priority. We strive to provide an unmatched shopping experience.", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Innovation", description: "Constantly evolving our designs to bring you the latest trends and timeless classics.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture">

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#F0F0ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <span className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-medium text-[#C45C3E] mb-6 shadow-sm">
                Established 2020
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Redefining Fashion for the Modern World
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We believe style shouldn't compromise on comfort or conscience. 
                SHOP.CO is dedicated to bringing you curated collections that tell a story.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/category" className="btn-primary px-8 py-3 rounded-full text-sm font-semibold relative z-10">
                  Shop Collection
                </Link>
                <Link to="/contact" className="btn-secondary px-8 py-3 rounded-full text-sm font-semibold border-gray-300">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative Shape */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'ellipse(70% 100% at 50% 100%)' }}></div>
        </section>

        {/* Brand Story Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Composition */}
              <div className="relative animate-fade-up">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
                    alt="Fashion Store" 
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80" 
                    alt="Fabric Details" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Background */}
                <div className="absolute -top-6 -left-6 w-full h-full bg-[#C45C3E]/10 rounded-2xl z-0"></div>
              </div>

              {/* Text Content */}
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded in 2020, SHOP.CO started as a small passion project by a group of fashion enthusiasts tired of the "fast fashion" cycle. We wanted to create a platform where quality, sustainability, and aesthetic meet.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Today, we partner with artisans and brands worldwide to bring you pieces that are not just clothes, but investments in style and sustainability. Every item in our collection is hand-picked to ensure it meets our strict standards for fabric quality, ethical production, and timeless design.
                </p>
                
                <div className="flex gap-8 mt-8 pt-8 border-t border-gray-100">
                  <div>
                    <p className="font-display text-3xl font-bold text-[#C45C3E]">12K+</p>
                    <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-[#C45C3E]">200+</p>
                    <p className="text-sm text-gray-500 mt-1">Global Brands</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-[#C45C3E]">15+</p>
                    <p className="text-sm text-gray-500 mt-1">Countries Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our commitment to excellence is reflected in our core values.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div 
                  key={value.title} 
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fade-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-[#C45C3E]/10 rounded-xl flex items-center justify-center mb-6 text-[#C45C3E] group-hover:bg-[#C45C3E] group-hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Meet The Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The creative minds behind your favorite looks.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.name} 
                  className="text-center group animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <div className="flex gap-3">
                        {/* Social Icons Placeholder */}
                        <a href="#" className="text-white hover:text-[#C45C3E]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a href="#" className="text-white hover:text-[#C45C3E]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-[#C45C3E]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#C45C3E]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C45C3E]/10 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Explore our latest arrivals and find your next favorite outfit today.
            </p>
            <Link 
              to="/category" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C45C3E] hover:bg-[#A84A30] rounded-full text-white font-semibold transition-colors"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;