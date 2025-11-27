"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import useSWR from "swr";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { theme } from "../utils/theme";

const fetcher = (url) => fetch(url).then((res) => res.json());

function ShopContent() {
  const { searchQuery } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch categories
  const { data: categories = ["All"] } = useSWR("/api/categories", fetcher);

  // Fetch products
  // We fetch all products for client-side filtering to match previous behavior
  // Ideally, we should move filtering to server-side API
  const { data: products = [], isLoading } = useSWR("/api/products?limit=100", fetcher);

  // Sync activeCategory with URL search params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      // Case-insensitive match
      const match = categories.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setActiveCategory(match);
      } else {
        setActiveCategory("All");
      }
    } else {
      setActiveCategory("All");
    }
  }, [searchParams, categories]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${cat.toLowerCase()}`, { scroll: false });
    }
  };

  // Client-side filtering
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`${theme.layout.container} py-12 animate-fade-in`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-8 border-b border-gray-100 transition-colors duration-300">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Shop Collection
          </h1>
          <p className="mt-2 text-gray-500">
            {isLoading
              ? "Loading products..."
              : searchQuery
                ? `Search results for "${searchQuery}"`
                : `Showing ${filteredProducts.length} curated items`}
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                ? "bg-black text-white shadow-lg shadow-black/20"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="text-gray-500 mt-1">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : (
        <div className={theme.layout.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
