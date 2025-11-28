"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import {
  Star,
  CheckCircle,
  Heart,
  ChevronLeft,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RefreshCw,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import Button from "../../components/ui/Button";
import ProductReviews from "../../components/ProductReviews";
import StarRating from "../../components/ui/StarRating";

export default function ProductDetailClient({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const router = useRouter();
  const isLiked = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-white animate-fade-in pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb / Back Link */}
        <nav className="flex items-center mb-8 text-sm font-medium text-gray-500">
          <Link href="/shop" className="flex items-center hover:text-black transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.category}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
          {/* Image Gallery Section */}
          <div className="mb-12 lg:mb-0">
            <div className="sticky top-24">
              <div className="aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm relative group mb-6">
                <img
                  src={product.images ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  {product.rating >= 4.8 && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white/90 backdrop-blur-md text-black shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-2" />
                      Top Rated
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx
                        ? "border-black shadow-md scale-105"
                        : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Signals below image */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl">
                  <Truck className="w-6 h-6 text-gray-900 mb-2" />
                  <span className="text-xs font-bold text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl">
                  <ShieldCheck className="w-6 h-6 text-gray-900 mb-2" />
                  <span className="text-xs font-bold text-gray-600">Secure Pay</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl">
                  <RefreshCw className="w-6 h-6 text-gray-900 mb-2" />
                  <span className="text-xs font-bold text-gray-600">Free Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col pt-6">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <StarRating rating={product.rating} size="md" reviewCount={product.reviews} />
                  <span className="font-bold text-yellow-700 ml-2">{product.rating}</span>
                  <span className="text-yellow-600/60 mx-1">/</span>
                  <span className="text-yellow-600 text-sm">5.0</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 font-medium">{product.reviews} Verified Reviews</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>

            <div className="prose prose-lg text-gray-500 mb-10 leading-relaxed">
              <p>{product.description || "Experience premium quality with this meticulously crafted item. Designed for modern living, it combines functionality with timeless aesthetics."}</p>
            </div>

            {/* Actions */}
            <div className="space-y-6 border-t border-gray-100 pt-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-200 rounded-full p-1">
                  <button
                    onClick={decrementQty}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
                  <button
                    onClick={incrementQty}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Only <span className="text-orange-500 font-bold">12 items</span> left in stock!
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 text-lg shadow-xl shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 transition-all transform hover:-translate-y-1"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 text-lg shadow-xl shadow-black/10 hover:shadow-black/20 transition-all transform hover:-translate-y-1 bg-black text-white hover:bg-zinc-800"
                >
                  Checkout <CreditCard className="ml-2 w-5 h-5" />
                </Button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`px-4 rounded-xl border-2 transition-all flex items-center justify-center ${isLiked
                    ? "border-red-100 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
                    }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Product Highlights</h3>
              <ul className="space-y-4">
                {[
                  "Premium materials sourced ethically",
                  "Hand-finished details for unique character",
                  "Durable construction built to last",
                  "Modern design that fits any space"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Reviews Section */}
            <ProductReviews productId={product.id} />
          </div>
        </div >
      </div >
    </div >
  );
}

