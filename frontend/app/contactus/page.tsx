"use client";

import React, { useState } from "react";

interface ContactFormData {
name: string;
companyname: string;
mobileno: string;
message: string;
}

export default function ContactPage() {
const [formData, setFormData] = useState<ContactFormData>({
name: "",
companyname: "",
mobileno: "",
message: "",
});

const [status, setStatus] = useState("");

// prevents TypeScript undefined error
const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setStatus("Sending...");

try {
  const res = await fetch(`${STRAPI}/api/contactuses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: formData,
    }),
  });

  if (!res.ok) throw new Error("Failed");

  setStatus("Message sent successfully ✅");

  setFormData({
    name: "",
    companyname: "",
    mobileno: "",
    message: "",
  });
} catch (err) {
  setStatus("Failed to send ❌");
}

};

return ( <div className="bg-slate-50">

  {/* HERO SECTION (BLUE — SAME AS ABOUT PAGE) */}
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#0E5AA7] via-[#1E78C8] to-[#0B3C6F]" />
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" />

    <div className="relative max-w-7xl mx-auto px-6 py-10 text-white text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Contact & Enquiry
      </h1>

      <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
        Need industrial safety equipment? Share your requirements and our team
        will get back to you with the best quotation and product recommendations.
      </p>
    </div>
  </section>

  {/* MAIN CONTENT */}
  <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 -mt-24 relative z-10">

    {/* ENQUIRY FORM */}
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
        Request a Quote
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Your Requirement</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0E5AA7] text-white py-3 rounded-lg font-semibold hover:bg-[#0B3C6F] transition"
        >
          Submit Enquiry
        </button>

        {status && (
          <p className="text-center text-sm font-medium">{status}</p>
        )}
      </form>
    </div>

    {/* LOCATION SECTION */}
    <div className="space-y-8">

      {/* MAP */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.550516898856!2d79.1267890740872!3d10.754815659593962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab933e1f44b11%3A0x78a829fd5d92c065!2sP%20square%20enterprises!5e1!3m2!1sen!2sin!4v1771757871088!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>

      {/* CONTACT INFO */}
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-5 border-b pb-3">
          Our Office
        </h2>

        <div className="space-y-4 text-gray-700">

          <p>
            <span className="font-semibold">Address:</span><br />
            P Square Enterprises<br />
            Tamil Nadu, India
          </p>

          <p>
            <span className="font-semibold">Phone:</span><br />
            +91 9840912665
          </p>

          <p>
            <span className="font-semibold">Email:</span><br />
            write2psquare@gmail.com
          </p>

          <p>
            <span className="font-semibold">Working Hours:</span><br />
            Monday – Saturday (9:00 AM – 6:00 PM)
          </p>

        </div>
      </div>

    </div>
  </div>
</div>

);
}
