"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle,
  Star,
  Quote,
  Zap,
  RefreshCw,
  Mail,
} from "lucide-react";
import ProductCard from "./components/ProductCard";
import { DB } from "./data/products"; // Direct import works in RSC
import { theme } from "./utils/theme";
import Button from "./components/ui/Button";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop", // Original
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop", // Modern Interior
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", // Lifestyle/Fashion
    "https://images.unsplash.com/photo-1468495244123-6c6ef332cc69?q=80&w=2070&auto=format&fit=crop", // Tech
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const brands = [
    "Lumina",
    "Vogue",
    "UrbanCraft",
    "PureTech",
    "EcoLife",
    "Zenith",
  ];
  const activeCategories = DB.categories.filter((c) => c !== "All");

  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Interior Designer",
      content:
        "ModernShop has completely transformed how I source items for my clients. The quality is unmatched and the aesthetic is exactly what I look for.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content:
        "I bought the noise-canceling headphones and they are a game changer. Fast shipping and premium packaging. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Lifestyle Blogger",
      content:
        "Finally a store that understands modern minimalism. Every piece feels curated and special. I'm obsessed with the new collection.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Worldwide Shipping",
      description: "On all orders over $150. Tracked and insured.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Protected by industry-leading encryption standards.",
    },
    {
      icon: RefreshCw,
      title: "30-Day Returns",
      description: "Not perfect? Return it hassle-free within 30 days.",
    },
  ];

  const products = DB.products;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={img}
                alt={`Hero Background ${index + 1}`}
                className={`w-full h-full object-cover object-center brightness-[0.7] transition-transform duration-[10000ms] ease-linear ${index === currentImageIndex ? "scale-110" : "scale-100"
                  }`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="space-y-8 animate-fade-in-up max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-widest uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              New Collection 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              Redefine Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Lifestyle.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
              Discover a curated selection of premium essentials designed to elevate your everyday living. Quality, style, and substance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/shop">
                <Button
                  className="w-full sm:w-auto text-lg px-10 py-5 !bg-white !text-black hover:bg-gray-100 border-none shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 font-bold rounded-full"
                >
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-10 py-5 text-white border-white/30 hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all duration-300 rounded-full"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-black text-white border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium tracking-widest uppercase mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand, idx) => (
              <span key={idx} className="text-2xl md:text-3xl font-bold font-serif tracking-tighter hover:text-white transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories - Bento Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
            <div className="max-w-2xl">
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Collections</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Curated Categories
              </h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors group">
              View All Collections <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Large Item */}
            <Link href="/shop?category=apparel" className="group relative md:col-span-8 row-span-2 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
                alt="Apparel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2 block">120+ Items</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Apparel</h3>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gray-200">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Medium Item 1 */}
            <Link href="/shop?category=accessories" className="group relative md:col-span-4 row-span-1 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=800&q=80"
                alt="Accessories"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-1">Accessories</h3>
                <p className="text-white/80 text-sm">85+ Items</p>
              </div>
            </Link>

            {/* Medium Item 2 */}
            <Link href="/shop?category=electronics" className="group relative md:col-span-4 row-span-1 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=800&q=80"
                alt="Electronics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-1">Electronics</h3>
                <p className="text-white/80 text-sm">45+ Items</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Shop</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                Trending Now
              </h2>
              <p className="text-gray-500 max-w-xl text-lg">
                Our most coveted pieces, loved by the community. Don't miss out on these favorites.
              </p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-black font-bold hover:text-indigo-600 transition-colors group">
              View All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full rounded-full py-6">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Trust Signals */}
      <section className="py-32 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-[2rem] bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-8 text-white shadow-lg group-hover:shadow-indigo-500/30 transition-shadow duration-500">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">Loved by Thousands</h2>
            <p className="text-gray-500 text-lg">
              Join our community of satisfied customers who have elevated their lifestyle with ModernShop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl border border-gray-100 relative group transition-all duration-500 hover:-translate-y-1">
                <Quote className="absolute top-10 right-10 w-10 h-10 text-indigo-100 group-hover:text-indigo-200 transition-colors" />
                <div className="flex items-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed font-medium">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-50 group-hover:ring-indigo-50 transition-all" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-indigo-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-4 sm:mx-6 lg:mx-8 mb-12">
        <div className="relative bg-black rounded-[3rem] overflow-hidden py-24 px-6 sm:px-12 lg:px-20 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-40 -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Join the Movement</h2>
            <p className="text-gray-300 mb-10 text-xl leading-relaxed">Subscribe to our newsletter to receive exclusive offers, early access to new drops, and design inspiration.</p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/20 backdrop-blur-md transition-all text-lg"
              />
              <button className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-white/10">
                Subscribe <Mail className="w-5 h-5" />
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-6">No spam, ever. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
