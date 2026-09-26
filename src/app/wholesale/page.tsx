"use client";

import { useState, FormEvent } from "react";

export default function WholesalePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="font-serif text-2xl text-stone-800 mb-4">Thank you</h1>
        <p className="text-stone-600">
          Thanks for your wholesale inquiry. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl text-stone-800 mb-4">Wholesale</h1>
      <p className="text-stone-600 mb-8">
        We offer wholesale pricing to bookstores and select shops outside Japan. Minimum
        order quantities vary by title and are listed on each item&apos;s page. Shipping is
        charged at cost, and payment terms can be discussed to fit your shop. Orders are
        not processed through this site — please get in touch using the form below and
        we&apos;ll follow up with pricing and availability.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="shopName" className="block text-sm font-medium text-stone-700 mb-1">
            Shop name
          </label>
          <input
            type="text"
            id="shopName"
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-stone-700 mb-1">
            Country
          </label>
          <input
            type="text"
            id="country"
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="webOrInstagram" className="block text-sm font-medium text-stone-700 mb-1">
            Website or Instagram
          </label>
          <input
            type="text"
            id="webOrInstagram"
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="titlesAndQuantities" className="block text-sm font-medium text-stone-700 mb-1">
            Which titles & quantities
          </label>
          <textarea
            id="titlesAndQuantities"
            rows={3}
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
        >
          Send inquiry
        </button>
      </form>
    </div>
  );
}
