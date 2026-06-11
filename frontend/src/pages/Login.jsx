import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShoppingBag,
  LogIn,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { toast, Toaster } from 'react-hot-toast'; // Make sure to install: npm install react-hot-toast

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Validation Schema
  const validationSchema = Yup.object({
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
      email: "",
      password: "",
      rememberMe: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, setFieldError }) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${BACKEND_API}/UserRoute/login`,
          {
            email: values.email,
            password: values.password
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId",response.data.user._id)
          dispatch(
            setUser({
              user: response.data.user,
              token: response.data.token,
            })
          );
        }

        if (values.rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success(response.data.message || "Login successful!");
        
        // Small delay before navigation to show the toast
        setTimeout(() => {
          navigate("/");
        }, 1000);

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        
        toast.error(errorMessage);

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

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      formik.setFieldValue("email", rememberedEmail);
      formik.setFieldValue("rememberMe", true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Add Toaster component */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
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
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Sajilo<span className="text-emerald-600">Mart</span>
              </span>
            </div>
            <p className="text-gray-600 text-lg">Welcome back! Sign in to your account</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Side - Welcome Message and Benefits */}
            <div className="flex-1 hidden lg:block">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h3>
                <div className="space-y-6">
                  {[
                    { icon: "🛒", text: "Track your orders easily" },
                    { icon: "❤️", text: "Save items to wishlist" },
                    { icon: "⚡", text: "Express checkout process" },
                    { icon: "🎯", text: "Personalized recommendations" },
                    { icon: "🎉", text: "Exclusive member offers" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>New to SajiloMart?</span>
                    <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                      Create an account
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 w-full">
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/50">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Sign In</h2>
                  <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formik.errors.email}
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
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      Forgot Password?
                    </Link>
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
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Terms and Privacy */}
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By signing in, you agree to our{' '}
                    <Link to="/terms" className="text-emerald-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-emerald-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>

                  {/* Mobile Sign Up Link */}
                  <div className="lg:hidden text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700">
                        Create one
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;