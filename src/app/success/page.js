"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Copy, ArrowRight, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

export default function SuccessPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { addToast } = useToast();
  const couponCode = "WELCOME20";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    addToast("Coupon code copied!", "success");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4 animate-fade-in relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-white/50 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow shadow-lg shadow-green-100">
          <Check className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mb-10 text-lg">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>

        {/* Interactive Coupon Section */}
        <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
          <div
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 cursor-pointer group ${isRevealed ? 'border-indigo-500 bg-indigo-50' : 'hover:border-indigo-300'}`}
            onClick={() => setIsRevealed(true)}
          >
            {!isRevealed ? (
              <div className="flex flex-col items-center justify-center py-4">
                <span className="text-2xl font-bold text-gray-400 mb-2 group-hover:text-indigo-500 transition-colors">Click to Reveal Gift</span>
                <span className="text-sm text-gray-400">You've unlocked a special discount!</span>
              </div>
            ) : (
              <div className="animate-scale-in">
                <p className="text-sm font-bold text-indigo-600 mb-2 uppercase tracking-wider">Next Order Discount</p>
                <div className="flex items-center justify-center gap-4 bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                  <span className="text-2xl font-mono font-bold text-gray-900 tracking-widest">{couponCode}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-indigo-600"
                    title="Copy Code"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-indigo-400 mt-2">20% OFF your next purchase</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full justify-center">
              Track Order
            </Button>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <Button className="w-full justify-center shadow-lg shadow-indigo-200">
              Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
