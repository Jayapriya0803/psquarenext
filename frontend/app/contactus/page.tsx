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

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

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

      const data = await res.json();
      console.log(data);

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>

        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />

        <input name="companyname" placeholder="Company Name" value={formData.companyname} onChange={handleChange} className="w-full border p-2 rounded" required />

        <input name="mobileno" placeholder="Mobile Number" value={formData.mobileno} onChange={handleChange} className="w-full border p-2 rounded" required />

        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="w-full border p-2 rounded" rows={4} required />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send
        </button>

        {status && <p className="text-center text-sm">{status}</p>}
      </form>
    </div>
  );
}
