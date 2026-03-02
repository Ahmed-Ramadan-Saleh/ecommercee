import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// --- Helper Functions ---
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const calculatePasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const level = Math.min(score, 3);

  if (level === 0) return { width: "0%", color: "transparent", label: "" };
  if (level === 1) return { width: "33%", color: "#E53935", label: "Weak" };
  if (level === 2) return { width: "66%", color: "#FFA726", label: "Medium" };
  return { width: "100%", color: "#4CAF50", label: "Strong" };
};

const Signup = () => {
  // --- State ---
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    isError: false,
  });

  // --- Derived State ---
  const passwordStrength = calculatePasswordStrength(formData.password);

  // --- Effects ---

  // Hide toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(
        () => setToast({ show: false, message: "", isError: false }),
        4000,
      );
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullname":
        if (value.trim().length < 2) return "Please enter your full name";
        break;
      case "email":
        if (!value) return "Please enter your email";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case "password":
        if (value.length > 0 && value.length < 8)
          return "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (value && value !== formData.password)
          return "Passwords do not match";
        break;
      case "terms":
        if (!value) return "You must agree to the terms";
        break;
    }
    return null;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      fullname: validateField("fullname", formData.fullname),
      email: validateField("email", formData.email),
      password:
        formData.password.length < 8
          ? "Password must be at least 8 characters"
          : null,
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : null,
      terms: !formData.terms ? "You must agree to the terms" : null,
    };

    // Filter out null errors to check if any exist
    const hasErrors = Object.values(newErrors).some((err) => err !== null);

    if (hasErrors) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      showToast("Please fix the errors above", true);
      return;
    }

    // Simulate Submission
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showToast("Account created successfully! Welcome to SHOP.CO");

      setTimeout(() => {
        // window.location.href = "/signin";
        console.log("Redirecting to sign in...");
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Create Account - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture px-4">

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center py-12 lg:py-20 px-4">
          <div className="w-full max-w-md animate-fade-up">
            <div className="bg-surface rounded-3xl border border-line p-8 lg:p-10 shadow-sm">
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2 text-primary">
                  Create Account
                </h1>
                <p className="text-secondary">
                  Join SHOP.CO and start shopping
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className={`space-y-5 ${shake ? "animate-shake" : ""}`}
                noValidate
              >
                {/* Full Name */}
                <div>
                  <label
                    className="block text-sm font-medium text-primary mb-2"
                    htmlFor="fullname"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input w-full px-4 py-3 rounded-xl ${errors.fullname ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="Enter your name"
                    autoComplete="name"
                  />
                  {errors.fullname && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fullname}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium text-primary mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input w-full px-4 py-3 rounded-xl ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email}
                    </p>
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
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input w-full px-4 py-3 pr-12 rounded-xl ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                      placeholder="Create a password"
                      autoComplete="new-password"
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

                  {/* Strength Indicator */}
                  <div className="mt-3">
                    <div className="h-1 bg-line rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: passwordStrength.width,
                          backgroundColor: passwordStrength.color,
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-secondary">
                        Password strength
                      </p>
                      <p
                        className="text-xs font-medium"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    className="block text-sm font-medium text-primary mb-2"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input w-full px-4 py-3 pr-12 rounded-xl ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                      aria-label="Toggle confirm password visibility"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showConfirmPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        ) : (
                          <>
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
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-line text-industrial-red focus:ring-industrial-red mt-0.5"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                    />
                    <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                      I agree to the{" "}
                      <a href="#" className="text-industrial-red hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-industrial-red hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-xs text-red-500 mt-1 ml-8">
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className={`btn-primary w-full py-4 rounded-full font-semibold relative z-10 mt-6 disabled:opacity-90 ${isSuccess ? "!bg-green-600" : ""}`}
                >
                  {isLoading
                    ? "Creating Account..."
                    : isSuccess
                      ? "Account Created!"
                      : "Create Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-line" />
                <span className="text-sm text-secondary">or continue with</span>
                <div className="flex-1 h-px bg-line" />
              </div>

              {/* Social Buttons */}
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

              <p className="text-center text-sm text-secondary mt-8">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary hover:text-industrial-red transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
              toast.isError 
                ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200" 
                : "bg-surface border-line text-primary"
            }`}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {toast.isError ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                )}
              </svg>
              <span className="text-sm">{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;