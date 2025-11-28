import { CheckCircle, Users, Globe, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About Us | ModernShop",
  description: "We are crafting the future of retail.",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-sm md:text-base text-indigo-400 font-bold tracking-[0.2em] uppercase mb-6 animate-slide-up">
            Who We Are
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-slide-up animation-delay-100">
            Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Future</span> of Retail
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-gray-400 mx-auto leading-relaxed mb-10 animate-slide-up animation-delay-200">
            ModernShop isn't just a store; it's a movement. We believe in quality, transparency, and design that speaks for itself.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We started with a simple idea: to make premium products accessible to everyone. We cut out the middlemen and work directly with manufacturers to bring you high-quality goods at honest prices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sustainability is at our core. From ethically sourced materials to eco-friendly packaging, every decision we make is driven by our commitment to the planet and our community.
              </p>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              {/* Placeholder for a team or office image */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-9xl">
                MS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900">Our Core Values</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Globe,
                title: "Sustainability First",
                desc: "We prioritize the planet in everything we do, from sourcing to shipping.",
              },
              {
                icon: Award,
                title: "Uncompromised Quality",
                desc: "We never settle for less. Every product is tested to meet our rigorous standards.",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "We build for you. Your feedback shapes our products and our future.",
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                  <value.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Happy Customers", value: "10k+" },
              { label: "Products Sold", value: "50k+" },
              { label: "Years Active", value: "5" },
              { label: "Countries Served", value: "25+" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to experience the difference?</h2>
          <Link href="/shop">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 border-none px-8 py-4 text-lg shadow-xl shadow-indigo-900/20">
              Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
