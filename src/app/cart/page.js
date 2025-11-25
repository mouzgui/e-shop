"use client";

import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2, ShieldCheck } from "lucide-react";

import { useStore } from "../context/StoreContext";
import Button from "../components/ui/Button";
import { theme } from "../utils/theme";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div
        className={`${theme.layout.container} py-24 text-center animate-fade-in`}
      >
        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${theme.layout.container} py-12 animate-fade-in`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Shopping Bag</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-6 flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-2 hover:bg-gray-100 rounded-l-full text-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-full text-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1 px-3 py-1 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-3xl px-6 py-8 sm:p-10 lg:col-span-5 lg:mt-0 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/checkout" className="block w-full">
              <Button className="w-full py-4 text-lg shadow-xl shadow-indigo-200">
                Proceed to Checkout
              </Button>
            </Link>
            <p className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 mr-1" /> Secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
