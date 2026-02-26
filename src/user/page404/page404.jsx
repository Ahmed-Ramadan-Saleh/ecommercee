import React from "react";
import "./page404.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture">
        <>

          {/* Main Content */}
          <main style={{minHeight:"100vh"}} className="flex-grow flex items-center justify-center relative overflow-hidden py-12">
            {/* Background 404 Number */}
            <div className="error-number font-display select-none">404</div>
            {/* Content Card */}
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto animate-fade-in">
              {/* Decorative Element */}
              <div className="inline-block mb-6 animate-float">
                <div className="w-20 h-20 rounded-full border-2 border-[#E8E8E5] flex items-center justify-center bg-white shadow-sm">
                  <svg
                    className="w-8 h-8 text-[#C45C3E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
                Page Not Found
              </h1>
              <p className="text-lg text-[#8A8A8A] mb-8 leading-relaxed">
                Sorry, we couldn't find the page you're looking for. Perhaps you
                mistyped the URL or the page has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/"
                  className="btn-primary px-8 py-3 rounded-full font-semibold text-sm relative z-10 w-full sm:w-auto text-center"
                >
                  Back to Homepage
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary px-8 py-3 rounded-full font-semibold text-sm w-full sm:w-auto text-center"
                >
                  Contact Support
                </Link>
              </div>

            </div>
          </main>
        
        </>
      </div>
    </>
  );
};

export default Page404;
