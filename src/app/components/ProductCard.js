"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingBag, Zap } from "lucide-react";
import { useStore } from "../context/StoreContext";
import Button from "./ui/Button";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const isLiked = isInWishlist(product.id);

  const handleCardClick = () => {
    router.push(`/shop/${product.id}`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
    router.push("/checkout");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Badges / Top Actions */}
        <div className="absolute top-4 left-4 z-10">
          {product.rating >= 4.8 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-black shadow-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              Top Rated
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-3 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 ${isLiked
              ? "bg-red-50 text-red-500"
              : "bg-white/90 text-gray-400 hover:text-gray-900"
              }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 pb-6">
          <div className="w-full space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            <Button
              variant="secondary"
              onClick={handleAddToCart}
              className="w-full border-none shadow-lg py-3.5 font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className="w-full bg-black text-white hover:bg-zinc-800 border-none shadow-lg py-3.5 font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <Zap className="w-4 h-4" /> Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <Link
            href={`/shop/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-indigo-600 transition-colors block line-clamp-2"
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${product.price}
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium text-gray-900">{product.rating}</span>
            <span className="mx-1">·</span>
            <span>{product.reviews} reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
