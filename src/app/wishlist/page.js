"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import { theme } from "@/utils/theme";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className={`${theme.layout.container} py-12 animate-fade-in`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
      <p className="text-gray-500 mb-12">Items you've saved for later.</p>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mt-1 mb-6">
            Start saving your favorite items.
          </p>
          <Link href="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className={theme.layout.grid}>
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
