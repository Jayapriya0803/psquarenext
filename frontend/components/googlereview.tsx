"use client";

import { useEffect } from "react";

export default function GoogleReviews() {
  useEffect(() => {
    if (
      document.querySelector(
        'script[src="https://elfsightcdn.com/platform.js"]'
      )
    ) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E5AA7] via-[#1E78C8] to-[#0B3C6F]" />

      {/* SOFT INDUSTRIAL OVERLAY */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1 text-sm font-semibold tracking-wide text-yellow-300 bg-yellow-300/15 rounded-full">
            ⭐ Google Verified Reviews
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by Industrial Clients
          </h2>

          <p className="mt-4 text-blue-100">
            Real feedback from customers who rely on our quality cotton knitted
            gloves and safety products.
          </p>
        </div>

        {/* REVIEW CARD */}
        <div className="mt-14 bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          <div
            className="elfsight-app-9b74b7fa-8bcd-453f-97be-7c5ca2657073"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
