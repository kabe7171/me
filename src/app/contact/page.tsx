"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="font-serif text-2xl text-stone-800 mb-4">送信完了</h1>
        <p className="text-stone-600">
          お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl text-stone-800 mb-8">お問い合わせ</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
            お名前
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
            お問い合わせ内容
          </label>
          <textarea
            id="message"
            rows={5}
            required
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
        >
          送信する
        </button>
      </form>
    </div>
  );
}
