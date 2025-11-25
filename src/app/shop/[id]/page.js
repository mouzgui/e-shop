// import { DB } from "@/data/products";
import { DB } from "../../data/products";
import ProductDetailClient from "./ProductDetailClient";

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = DB.products.find((p) => p.id === parseInt(id));
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | ModernShop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = DB.products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  // Pass data to a Client Component for interactivity (Add to Cart, Wishlist)
  return <ProductDetailClient product={product} />;
}
