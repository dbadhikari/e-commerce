import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  XCircle,
  Info,
  AlertCircle
} from "lucide-react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
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
    info: <Info className="w-5 h-5" />,
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

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, setFieldError }) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${BACKEND_API}/UserRoute/register`,
          values
        );

        showToast(response.data.message || "Account created successfully! Please verify your email.", "success");

        setTimeout(() => {
          navigate("/verify-otp", {
            state: {
              email: values.email
            }
          });
        }, 1500);

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        showToast(errorMessage, "error");
        
        // Set field-specific error from backend if available
        if (error.response?.data?.field) {
          setFieldError(error.response.data.field, errorMessage);
        } else {
          setErrors({ general: errorMessage });
        }
      } finally {
        setIsLoading(false);
      }
    }
  });

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
        <div className="max-w-6xl mx-auto">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl shadow-lg animate-bounce-slow">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Sajilo<span className="text-emerald-600">Mart</span>
              </span>
            </div>
            <p className="text-gray-600 text-lg">Create your account and start shopping</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Side - Illustration and Benefits */}
            <div className="flex-1 hidden lg:block">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Join SajiloMart Today!</h3>
                <div className="space-y-6">
                  {[
                    { icon: "🛍️", text: "Access to 1000+ products" },
                    { icon: "🚚", text: "Free shipping on orders above Rs. 1000" },
                    { icon: "💎", text: "Exclusive member discounts" },
                    { icon: "🔄", text: "Easy 7-day returns" },
                    { icon: "🎁", text: "Birthday special offers" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-all group-hover:scale-110">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-all hover:translate-x-1 inline-flex items-center gap-1">
                      Sign in here <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex-1 w-full">
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/50 hover:shadow-3xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Create Account</h2>
                  <p className="text-gray-500 mt-2">Fill in your details to get started</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          formik.touched.name && formik.errors.name 
                            ? 'border-red-400 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-emerald-500'
                        } bg-white/90 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <AlertCircle className="w-3 h-3" /> {formik.errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          formik.touched.email && formik.errors.email 
                            ? 'border-red-400 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-emerald-500'
                        } bg-white/90 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <AlertCircle className="w-3 h-3" /> {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                          formik.touched.password && formik.errors.password 
                            ? 'border-red-400 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-emerald-500'
                        } bg-white/90 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-shake">
                        <AlertCircle className="w-3 h-3" /> {formik.errors.password}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">Password must be at least 6 characters</p>
                  </div>

                 

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !formik.isValid || !formik.dirty}
                    className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Terms and Privacy */}
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-emerald-600 hover:underline hover:text-emerald-700 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-emerald-600 hover:underline hover:text-emerald-700 transition-colors">
                      Privacy Policy
                    </Link>
                  </p>

                  {/* Mobile Sign In Link */}
                  <div className="lg:hidden text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
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

export default Register;