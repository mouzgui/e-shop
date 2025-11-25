import { theme } from "@/utils/theme";

export const metadata = {
  title: "About Us | ModernShop",
  description: "We are crafting the future of retail.",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-base text-indigo-400 font-bold tracking-widest uppercase mb-3">
            Who We Are
          </h2>
          <p className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Crafting the Future of Retail
          </p>
          <p className="max-w-2xl text-xl text-gray-400 mx-auto leading-relaxed">
            Modern Shop isn't just a store; it's a statement. We believe in
            quality, transparency, and design that speaks for itself.
          </p>
        </div>
      </div>
    </div>
  );
}
