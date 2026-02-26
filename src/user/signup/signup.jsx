import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./signup.css"; // Assuming CSS for animations and custom inputs
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
      <div className="bg-texture">


        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center py-12 lg:py-20 px-4">
          <div className="w-full max-w-md animate-fade-up">
            <div className="bg-white rounded-3xl border border-[#E8E8E5] p-8 lg:p-10 shadow-sm">
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                  Create Account
                </h1>
                <p className="text-[#8A8A8A]">
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
                    className="block text-sm font-medium mb-2"
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
                    className={`form-input w-full px-4 py-3 rounded-xl bg-[#FAFAF7] ${errors.fullname ? "error" : ""}`}
                    placeholder="Enter your name"
                    autoComplete="name"
                  />
                  {errors.fullname && (
                    <p className="text-xs text-[#E53935] mt-1">
                      {errors.fullname}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
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
                    className={`form-input w-full px-4 py-3 rounded-xl bg-[#FAFAF7] ${errors.email ? "error" : ""}`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#E53935] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
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
                      className={`form-input w-full px-4 py-3 pr-12 rounded-xl bg-[#FAFAF7] ${errors.password ? "error" : ""}`}
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#1A1A1A]"
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
                    <p className="text-xs text-[#E53935] mt-1">
                      {errors.password}
                    </p>
                  )}

                  {/* Strength Indicator */}
                  <div className="mt-3">
                    <div className="h-1 bg-[#E8E8E5] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: passwordStrength.width,
                          backgroundColor: passwordStrength.color,
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-[#8A8A8A]">
                        Password strength
                      </p>
                      <p
                        className="text-xs"
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
                    className="block text-sm font-medium mb-2"
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
                      className={`form-input w-full px-4 py-3 pr-12 rounded-xl bg-[#FAFAF7] ${errors.confirmPassword ? "error" : ""}`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#1A1A1A]"
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
                    <p className="text-xs text-[#E53935] mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox-custom mt-0.5"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                    />
                    <span className="text-sm text-[#8A8A8A] group-hover:text-[#1A1A1A] transition-colors">
                      I agree to the{" "}
                      <a href="#" className="text-[#C45C3E] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#C45C3E] hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-xs text-[#E53935] mt-1 ml-8">
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="btn-primary w-full py-4 rounded-full font-semibold relative z-10 mt-6 disabled:opacity-90"
                >
                  {isLoading
                    ? "Creating Account..."
                    : isSuccess
                      ? "Account Created!"
                      : "Create Account"}
                </button>
              </form>

              {/* Social & Footer Elements omitted for brevity, same structure as Signin */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-[#E8E8E5]" />
                <span className="text-sm text-[#8A8A8A]">or continue with</span>
                <div className="flex-1 h-px bg-[#E8E8E5]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Social buttons */}
                <button className="btn-social flex items-center justify-center gap-2 py-3 rounded-xl font-medium">
                  Google
                </button>
                <button className="btn-social flex items-center justify-center gap-2 py-3 rounded-xl font-medium">
                  Apple
                </button>
              </div>

              <p className="text-center text-sm text-[#8A8A8A] mt-8">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-[#1A1A1A] hover:text-[#C45C3E] transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Toast */}
        {toast.show && (
          <div className={`toast show ${toast.isError ? "error" : ""}`}>
            <div className="flex items-center gap-3">
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
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
