"use client";
import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, Search, Heart, User, Mail } from "lucide-react";
import { useStore } from "../context/StoreContext";

const Layout = ({ children, navigate, currentPage }) => {
  const { cartCount, wishlist, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (currentPage !== "products") {
      navigate("products");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* Modern Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => navigate("home")}
            >
              <div className="bg-black text-white p-2 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter">
                ModernShop.
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: "home", label: "Home" },
                { id: "products", label: "Shop" },
                { id: "about", label: "About" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Icons & Search */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="relative flex items-center">
                {isSearchOpen && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="absolute right-10 top-1/2 -translate-y-1/2 w-48 sm:w-64 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none animate-scale-in origin-right"
                  />
                )}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2.5 rounded-full transition-all relative z-10 ${
                    isSearchOpen
                      ? "bg-black text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {isSearchOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => navigate("wishlist")}
                className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-all relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              <button
                onClick={() => navigate("orders")}
                className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate("cart")}
                className="group p-2.5 rounded-full flex items-center relative text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2.5 text-gray-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 shadow-xl animate-fade-in z-50">
            <div className="flex flex-col space-y-2">
              {[
                { id: "home", label: "Home" },
                { id: "products", label: "Shop" },
                { id: "about", label: "About" },
                { id: "contact", label: "Contact" },
                { id: "orders", label: "My Orders" },
                { id: "wishlist", label: "Wishlist" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-base font-medium text-gray-900"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-xl font-bold tracking-tighter">
                ModernShop.
              </span>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Curating the finest goods for the modern individual. Quality,
                aesthetics, and sustainability at the core.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Shop
              </h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <button
                    onClick={() => navigate("products")}
                    className="hover:text-black transition-colors"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("products")}
                    className="hover:text-black transition-colors"
                  >
                    Accessories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("products")}
                    className="hover:text-black transition-colors"
                  >
                    Electronics
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Help
              </h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <button
                    onClick={() => navigate("orders")}
                    className="hover:text-black transition-colors"
                  >
                    Order Tracking
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("contact")}
                    className="hover:text-black transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("contact")}
                    className="hover:text-black transition-colors"
                  >
                    Customer Service
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Stay Connected
              </h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; 2024 ModernShop Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
