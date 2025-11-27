import { Suspense } from "react";
import HomeClient from "./components/HomeClient";
import { getAllProducts, getCategories } from "./api/products";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const productsData = getAllProducts(4); // Fetch 4 trending products
  const categoriesData = getCategories();

  const [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeClient products={products} categories={categories} />
    </Suspense>
  );
}
