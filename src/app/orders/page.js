"use client";

import Link from "next/link";
import { Package, Truck, AlertCircle } from "lucide-react";
import useSWR from "swr";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { theme } from "@/utils/theme";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function OrdersPage() {
  // In a real app, we'd pass the user's email or ID. 
  // For now, we fetch all orders (or filter by a hardcoded email if we had auth)
  const { data: orders = [], isLoading, error } = useSWR("/api/orders", fetcher);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading orders...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load orders</div>;

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
                      {new Date(order.date_created).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Total Amount
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ${parseFloat(order.total).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Status
                    </p>
                    <Badge status={order.status} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                    {order.line_items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        {/* WooCommerce line items don't always have images directly, 
                            we might need to fetch product details or use a placeholder if image is missing 
                            For now, using a placeholder or if we enhanced the API to include images */}
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                          {item.image?.src ? (
                            <img
                              src={item.image.src}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${parseFloat(item.total).toFixed(2)}</p>
                            </div>
                            {/* <p className="mt-1 text-sm text-gray-500">
                              {item.category}
                            </p> */}
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500 font-medium">Qty: {item.quantity}</p>
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
                <span className="font-medium text-gray-900 ml-1 capitalize">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
