"use client";

import { useState } from "react";
import { submitContactForm } from "../actions";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/ui/Button";
import { Mail, MapPin, Phone, Send, ArrowRight, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const { addToast } = useToast();
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData) {
    setPending(true);
    const result = await submitContactForm(formData);
    setPending(false);

    if (result.success) {
      addToast(result.message);
      // Optional: Reset form via ref or state
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header Section */}
      <div className="relative bg-black text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-indigo-900/20 blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')] opacity-10 bg-cover bg-center" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Let's Start a Conversation
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Have a question about our products or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-24">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">

          {/* Contact Info Sidebar */}
          <div className="lg:w-2/5 bg-gray-50 p-10 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Email us</p>
                    <p className="text-lg font-semibold text-gray-900">hello@modernshop.com</p>
                    <p className="text-sm text-gray-500 mt-1">We usually reply within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Call us</p>
                    <p className="text-lg font-semibold text-gray-900">+1 (555) 000-0000</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri from 8am to 5pm.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Visit us</p>
                    <p className="text-lg font-semibold text-gray-900">123 Design Street</p>
                    <p className="text-gray-600">Creative District, NY 10012</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="p-6 bg-indigo-600 rounded-2xl text-white relative overflow-hidden group cursor-pointer hover:bg-indigo-700 transition-colors">
                <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" /> Live Chat
                  </h4>
                  <p className="text-indigo-100 text-sm mb-4">
                    Need immediate assistance? Start a live chat with our support team.
                  </p>
                  <span className="inline-flex items-center text-sm font-bold">
                    Chat Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-3/5 p-10 sm:p-12 bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
            <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

            <form action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="John"
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 p-3.5 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastname"
                    type="text"
                    placeholder="Doe"
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 p-3.5 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 p-3.5 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 p-3.5 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none appearance-none"
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Product Feedback</option>
                  <option>Wholesale</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 p-3.5 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full py-4 text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {pending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
