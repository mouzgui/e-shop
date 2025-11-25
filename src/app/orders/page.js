"use client";

import Link from "next/link";
import { Package, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge"; // Ensure you have this component from previous refactor
import { theme } from "@/utils/theme";

export default function OrdersPage() {
  const { orders } = useStore();

  return (
    <div className={`${theme.layout.container} py-12 animate-fade-in`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
      <p className="text-gray-500 mb-12">
        Track and manage your recent purchases.
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500 mt-1 mb-6">
            When you place an order, it will appear here.
          </p>
          <Link href="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Order ID
                    </p>
                    <p className="text-sm font-medium text-gray-900 font-mono">
                      #{order.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Date Placed
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Total Amount
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge status={order.status} />
                  <Button
                    variant="secondary"
                    className="px-4 py-2 text-sm h-auto"
                  >
                    Track Order
                  </Button>
                </div>
              </div>
              {/* Order Items */}
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-100">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.qty}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex items-center text-sm text-gray-500">
                <Truck className="w-4 h-4 mr-2" />
                Delivery Status:{" "}
                <span className="font-medium text-gray-900 ml-1">
                  On the way to {order.shipping.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
