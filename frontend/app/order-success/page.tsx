"use client";

import Link from "next/link";

export default function OrderSuccess() {
return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4"> <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center space-y-5">

    {/* Title */}
    <h1 className="text-3xl font-bold text-green-600">
      Order Received ✅
    </h1>

    {/* Message */}
    <p className="text-gray-700 leading-relaxed">
      Your order is successfully received.
      <br />
      We will send the <span className="font-semibold">Proforma Invoice</span> to your mail ID shortly.
      <br />
      Thank you for shopping with us!
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
      <Link
        href="/product"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Continue Shopping
      </Link>

      <Link
        href="/"
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition"
      >
        Go to Home
      </Link>
    </div>
  </div>
</div>

);
}
