import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Toaster from "../shared/Toaster";

const Signin = () => {
  // --- State ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: null, password: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    isError: false,
  });

  // --- Validation ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailBlur = () => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Please enter your email" }));
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: "Please enter your password",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  };

  // --- Handlers ---

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(
      () => setToast({ show: false, message: "", isError: false }),
      4000,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation
    handleEmailBlur();
    handlePasswordBlur();

    // Check current validity
    const hasEmailError = !email || !validateEmail(email);
    const hasPasswordError = !password;

    if (hasEmailError || hasPasswordError) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 400);
      showToast("Please fix the errors above", true);
      return;
    }

    // Simulate Submission
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showToast("Sign in successful! Redirecting...");

      // Simulate redirect
      setTimeout(() => {
        // window.location.href = "/dashboard";
        console.log("Redirecting...");
      }, 1500);
    }, 1500);
  };

  // --- Effects ---

  // Clear error when user types
  useEffect(() => {
    if (email && errors.email) setErrors((prev) => ({ ...prev, email: null }));
  }, [email]);

  useEffect(() => {
    if (password && errors.password)
      setErrors((prev) => ({ ...prev, password: null }));
  }, [password]);

  return (
    <>
      <Helmet>
        <title>Sign In - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture px-4">
        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center py-12 lg:py-20 px-4">
          <div className="w-full max-w-md animate-fade-up">
            <div className="bg-surface rounded-3xl border border-line p-8 lg:p-10 shadow-sm relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute w-32 h-32 bg-industrial-red/10 -top-10 -right-10 blur-2xl rounded-full" />
              <div className="absolute w-24 h-24 bg-industrial-dark/5 -bottom-8 -left-8 blur-2xl rounded-full" />

              {/* Header */}
              <div className="text-center mb-8 relative">
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2 text-primary">
                  Welcome Back
                </h1>
                <p className="text-secondary">Sign in to continue to SHOP.CO</p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className={`space-y-5 relative ${shouldShake ? "animate-shake" : ""}`}
                noValidate
              >
                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium text-primary mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
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
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleEmailBlur}
                      className={`form-input w-full pl-12 pr-4 py-3 rounded-xl ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-sm font-medium text-primary mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                      className={`form-input w-full pl-12 pr-12 py-3 rounded-xl ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
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
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
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
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-line text-industrial-red focus:ring-industrial-red"
                    />
                    <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-industrial-red hover:text-industrial-red-hover transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className={`btn-primary w-full py-4 rounded-full font-semibold relative z-10 mt-6 disabled:opacity-90 ${isSuccess ? "!bg-green-600" : ""}`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin w-5 h-5 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : isSuccess ? (
                    "Success!"
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-line" />
                <span className="text-sm text-secondary">or continue with</span>
                <div className="flex-1 h-px bg-line" />
              </div>

              {/* Social Sign In */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium border border-line bg-surface hover:bg-muted transition-colors text-primary">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium border border-line bg-surface hover:bg-muted transition-colors text-primary">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-secondary mt-8">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-industrial-red transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Security Note */}
            <p className="text-center text-xs text-secondary mt-6 px-4 flex items-center justify-center gap-2">
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
              Secured with 256-bit SSL encryption
            </p>
          </div>
        </main>

        {/* Toast Notification */}
        {toast.show && <Toaster toast={toast} />}
      </div>
    </>
  );
};

export default Signin;
