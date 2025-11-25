"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, Search, Heart, User } from "lucide-react";
import { useStore } from "../context/StoreContext";


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (pathname !== "/shop") {
      router.push("/shop");
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black text-white p-2 rounded-xl transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-gray-900">
              ModernShop.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${pathname === item.href
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-black hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Bar */}
            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-full absolute left-0 top-0 h-20 bg-white z-50 px-4 sm:static sm:w-auto sm:h-auto sm:bg-transparent sm:p-0' : ''}`}>
              {isSearchOpen ? (
                <div className="relative w-full sm:w-64 lg:w-80 flex items-center animate-scale-in origin-right">
                  <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all shadow-sm text-gray-900 placeholder-gray-500"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-3 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>



            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-all relative"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </Link>

            {/* Orders */}
            <Link
              href="/orders"
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="group p-2.5 rounded-full flex items-center relative text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 text-gray-500 hover:bg-gray-100 hover:text-black"
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
              ...navItems,
              { href: "/orders", label: "My Orders" },
              { href: "/wishlist", label: "Wishlist" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-base font-medium text-gray-900 block"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
