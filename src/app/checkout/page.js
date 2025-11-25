"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  CreditCard,
  CheckCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Button from "@/components/ui/Button";
import { theme } from "@/utils/theme";
import { processOrder } from "../actions"; // Importing the Server Action

export default function CheckoutPage() {
  const router = useRouter();
  const { cartTotal, placeOrder, cart } = useStore();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if empty (Client side protection)
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      router.push("/cart");
    }
  }, [cart, router, isSuccess]);

  if (cart.length === 0 && !isSuccess) {
    return null;
  }

  async function handleSubmit(formData) {
    setLoading(true);

    // 1. Construct Order Data
    const orderDetails = {
      firstName: formData.get("firstName"),
      city: formData.get("city"),
      // ... other fields
    };

    // 2. Call Server Action (Simulated backend processing)
    const result = await processOrder(orderDetails);

    if (result.success) {
      // 3. Update Client Context (Clear cart, add to history)
      setIsSuccess(true);
      placeOrder(orderDetails);
      setLoading(false);
      router.push("/success");
    }
  }

  return (
    <div className={`${theme.layout.container} py-12 animate-fade-in`}>
      <Link
        href="/cart"
        className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Cart
      </Link>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shipping Information
          </h2>
          <form
            action={handleSubmit}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                required
                type="text"
                name="firstName"
                className={theme.components.input}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                required
                type="text"
                name="lastName"
                className={theme.components.input}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                required
                type="email"
                name="email"
                className={theme.components.input}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                required
                type="text"
                name="address"
                className={theme.components.input}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                required
                type="text"
                name="city"
                className={theme.components.input}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP / Postal code
              </label>
              <input
                required
                type="text"
                name="zip"
                className={theme.components.input}
              />
            </div>

            <div className="sm:col-span-2 pt-8 mt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="flex items-center gap-4 p-5 border border-indigo-100 bg-indigo-50/50 rounded-xl cursor-pointer ring-2 ring-indigo-600">
                <div className="bg-indigo-600 text-white p-3 rounded-full">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">
                    Pay securely when you receive your order.
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-indigo-600 ml-auto" />
              </div>
            </div>

            <div className="sm:col-span-2 mt-8">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg shadow-lg"
              >
                {loading
                  ? "Processing..."
                  : `Complete Order ($${cartTotal.toFixed(2)})`}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="hidden lg:block bg-gray-50 p-8 rounded-3xl h-fit sticky top-24 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Order Summary
          </h3>
          <ul className="mb-6 space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h4 className="font-bold text-gray-900 line-clamp-1 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">Qty: {item.qty}</p>
                </div>
                <div className="font-bold text-gray-900 text-sm">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-4 mb-8">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-4 text-sm text-gray-500 bg-white p-4 rounded-xl border border-gray-100">
            <p className="flex items-center">
              <Truck className="w-4 h-4 mr-2 text-green-500" /> Free Expedited
              Shipping
            </p>
            <p className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> 30-Day
              Free Returns
            </p>
            <p className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-500" /> Secure SSL
              Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
