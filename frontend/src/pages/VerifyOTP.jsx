import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Mail,
  RefreshCw,
  AlertCircle,
  XCircle
} from "lucide-react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500"
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md backdrop-blur-sm bg-opacity-95`}>
        {icons[type]}
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button onClick={onClose} className="hover:opacity-70 transition-opacity">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [toast, setToast] = useState(null);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false); // Track auto-submit
  const inputRefs = useRef([]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Redirect if email is not provided
  useEffect(() => {
    if (!email) {
      showToast("Email not found. Please register first.", "error");
      setTimeout(() => navigate("/register"), 1500);
    }
  }, [email, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Formik for OTP validation
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""]
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^\d?$/, "Must be a number"))
        .test("is-complete", "Please enter the complete 6-digit OTP", function(value) {
          return value && value.join("").length === 6;
        })
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const otpValue = values.otp.join("");
      
      if (otpValue.length !== 6) {
        setErrors({ otp: "Please enter the complete 6-digit OTP" });
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.post(
          `${BACKEND_API}/UserRoute/verify-otp`,
          {
            email,
            otp: otpValue
          }
        );

        showToast(response.data.message || "Email verified successfully!", "success");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Verification failed";
        setErrors({ otp: errorMessage });
        showToast(errorMessage, "error");
        
        // Clear the OTP fields on error so user can re-enter
        resetForm();
        setHasAutoSubmitted(false); // Reset auto-submit flag
        // Focus on first input
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...formik.values.otp];
    newOtp[index] = value.slice(0, 1);
    formik.setFieldValue("otp", newOtp);
    formik.setFieldError("otp", ""); // Clear error when user types
    
    // Reset auto-submit flag when user manually changes OTP
    setHasAutoSubmitted(false);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const pastedArray = pastedData.split("");
      const newOtp = [...formik.values.otp];
      for (let i = 0; i < pastedArray.length && i < 6; i++) {
        newOtp[i] = pastedArray[i];
      }
      formik.setFieldValue("otp", newOtp);
      setHasAutoSubmitted(false); // Reset auto-submit flag on paste
      
      // Focus on the next empty field or last field
      const nextEmptyIndex = newOtp.findIndex(val => !val);
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        inputRefs.current[nextEmptyIndex].focus();
      } else {
        inputRefs.current[5]?.blur();
        // Auto-submit when all fields are filled via paste (only once)
        if (!hasAutoSubmitted && !isLoading) {
          setHasAutoSubmitted(true);
          setTimeout(() => {
            formik.handleSubmit();
          }, 100);
        }
      }
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);

    try {
      const response = await axios.post(
        `${BACKEND_API}/UserRoute/resend-otp`,
        { email }
      );

      showToast(response.data.message || "New OTP sent successfully!", "success");
      setCountdown(60); // Set 60 seconds countdown
      formik.resetForm(); // Clear OTP fields
      setHasAutoSubmitted(false); // Reset auto-submit flag
      inputRefs.current[0]?.focus(); // Focus on first input

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to resend OTP";
      showToast(errorMessage, "error");
    } finally {
      setIsResending(false);
    }
  };

  // Auto-submit when OTP is complete (only once)
  useEffect(() => {
    const otpValue = formik.values.otp.join("");
    // Only auto-submit if:
    // 1. OTP has 6 digits
    // 2. Not already loading
    // 3. Not already auto-submitted
    // 4. No existing errors
    // 5. All fields are filled
    if (otpValue.length === 6 && 
        !isLoading && 
        !hasAutoSubmitted && 
        !formik.errors.otp &&
        formik.values.otp.every(digit => digit !== "")) {
      
      setHasAutoSubmitted(true);
      const timer = setTimeout(() => {
        formik.handleSubmit();
      }, 500); // Increased delay to 500ms for better UX
      
      return () => clearTimeout(timer);
    }
  }, [formik.values.otp, isLoading, hasAutoSubmitted, formik.errors.otp]);

  if (!email) {
    return null;
  }

  const hasError = formik.errors.otp && formik.touched.otp;
  const otpValue = formik.values.otp.join("");
  const isOtpComplete = otpValue.length === 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/register")}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Registration</span>
          </button>

          {/* Main Card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/50">
            {/* Icon and Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4 mx-auto shadow-lg animate-bounce-slow">
                <Shield className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Verify Your Email</h2>
              <p className="text-gray-500 mt-2">
                Please enter the 6-digit verification code sent to
              </p>
              <div className="inline-flex items-center gap-2 mt-1 px-4 py-1.5 bg-emerald-50 rounded-full">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-700 font-medium text-sm">{email}</span>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-center">
                  Verification Code
                </label>
                <div className="flex justify-center gap-2 md:gap-3">
                  {formik.values.otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      onBlur={() => formik.setFieldTouched("otp", true)}
                      disabled={isLoading}
                      className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-bold rounded-xl border-2 transition-all duration-200
                        ${hasError 
                          ? 'border-red-400 focus:ring-red-500 animate-shake' 
                          : digit 
                            ? 'border-emerald-400 bg-emerald-50 scale-105' 
                            : 'border-gray-300 focus:border-emerald-400'
                        } 
                        bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  ))}
                </div>
                
                {/* Error Message */}
                {hasError && (
                  <div className="flex items-center justify-center gap-2 mt-2 animate-shake">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-red-500 text-sm">{formik.errors.otp}</p>
                  </div>
                )}

                {/* Hint */}
                <p className="text-center text-xs text-gray-400 mt-2">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading || !isOtpComplete}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Account
                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>

              {/* Resend OTP Section */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isResending || isLoading}
                  className="mt-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto group"
                >
                  {isResending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      {countdown > 0 ? `Resend code in ${countdown}s` : "Resend OTP"}
                    </>
                  )}
                </button>

                {/* Help Text */}
                <p className="text-xs text-gray-400 mt-4">
                  Check your spam folder if you don't see the email within a few minutes
                </p>
              </div>
            </form>
          </div>

          {/* Success Tips */}
          <div className="mt-6 bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/60 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Verification Benefits:</h4>
                <ul className="text-xs text-gray-500 mt-1 space-y-1">
                  <li>• Secure your account and transactions</li>
                  <li>• Get order updates and tracking information</li>
                  <li>• Receive exclusive offers and discounts</li>
                  <li>• Reset password easily when needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default VerifyOTP;