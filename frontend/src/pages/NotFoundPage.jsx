import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Search,
  ShoppingBag,
  Compass,
  PackageSearch,
} from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-160px)] bg-gradient-to-b from-gray-50 to-white">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6">
              <Compass className="w-4 h-4" />
              Page not found
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none mb-5">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              This page is out of stock.
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mb-8">
              The link may be broken, the page may have moved, or the product
              you were looking for is no longer available.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-100 hover:shadow-xl transition-all"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold hover:border-emerald-300 hover:text-emerald-700 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Shop
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-40" />
            <div className="relative bg-white border border-gray-100 rounded-2xl shadow-xl p-8 md:p-10">
              <div className="w-24 h-24 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8">
                <PackageSearch className="w-12 h-12 text-emerald-600" />
              </div>

              <div className="space-y-5">
                <div className="h-3 w-28 bg-gray-200 rounded-full" />
                <div className="h-4 w-full bg-gray-100 rounded-full" />
                <div className="h-4 w-4/5 bg-gray-100 rounded-full" />
                <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
              </div>

              <div className="mt-10 flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500">Try searching from the shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
