import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import DataContext from "../../Context/ThemeContext";

const AdminLogin = () => {
  // --- State ---
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Theme
  const { Theme } = useContext(DataContext);

  // --- Handlers ---
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login Attempt", { email, password, rememberMe });
  };

  return (
    <>
      <Helmet>
        <title>Admin Sign In - SHOP.CO</title>
      </Helmet>

      <div className={`${Theme} min-h-screen flex flex-col lg:flex-row`}>
        {/* Left Brand Panel (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 bg-industrial-dark dark:bg-black text-white flex-col justify-center items-center p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute w-64 h-64 bg-industrial-red/10 rounded-full blur-3xl top-0 left-0" />
          <div className="absolute w-48 h-48 bg-industrial-red/5 rounded-full blur-2xl bottom-0 right-0" />

          <div className="relative z-10 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="w-12 h-12 bg-industrial-red rounded-lg flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="text-3xl font-bold tracking-tight">SHOP.CO</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-lg max-w-sm mx-auto">
              Manage your store, track orders, and analyze performance from one
              unified dashboard.
            </p>
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12 text-center">
              <div>
                <p className="text-2xl font-bold text-white">12k+</p>
                <p className="text-sm text-gray-500">Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$1.2M</p>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        {/* FIX: justify-start on mobile to prevent cut-off, center on desktop */}
        <div className="min-h-screen w-full lg:w-1/2 flex items-start lg:items-center justify-center lg:justify-center py-12 px-6 lg:p-8 bg-surface dark:bg-gray-900 transition-colors">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-2">
                <div className="w-10 h-10 bg-industrial-dark dark:bg-industrial-red rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="text-xl font-bold tracking-tight text-primary">
                  SHOP.CO
                </span>
              </div>
              <p className="mt-2 text-sm text-secondary">Admin Portal</p>
            </div>

            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-primary">Welcome back</h2>
              <p className="mt-2 text-sm text-secondary">
                Please enter your credentials to access the admin panel.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium text-primary mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="form-input w-full px-4 py-3 rounded-xl"
                  placeholder="admin@shop.co"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-sm font-medium text-primary mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="form-input w-full px-4 py-3 pr-12 rounded-xl"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary hover:text-primary transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              {/* Added flex-wrap for small screens */}
              <div className="flex items-center justify-between flex-wrap gap-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-line text-industrial-red focus:ring-industrial-red"
                    name="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-industrial-red hover:text-industrial-red-hover transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-full font-semibold text-sm relative z-10"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Security Note */}
            <div className="pt-6 border-t border-line text-center">
              <p className="text-xs text-secondary flex items-center justify-center gap-2">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Protected by SSL Encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
