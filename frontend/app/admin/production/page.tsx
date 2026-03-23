"use client";

import { useState } from "react";

export default function ProductionPage() {

  const [form, setForm] = useState({
    descrip: "",
    gsm: "GSM40",
    color: "blue",
    date: "",
    quantity: "",
    unit: "pairs"
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

    await fetch(`${STRAPI_URL}/api/productions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: form })
    });

    alert("Production Added");
  };

  return (

    <div className="p-4 sm:p-8 flex justify-center">

      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-4 sm:p-6">

        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Daily Production Entry
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              name="descrip"
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* GSM + Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                GSM
              </label>
              <select
                name="gsm"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="GSM40">40 GSM</option>
                <option value="GSM50">50 GSM</option>
                <option value="GSM60">60 GSM</option>
                <option value="GSM70">70 GSM</option>
                <option value="GSM80">80 GSM</option>
                <option value="COTTONWASTE">Waste Cloth</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Color
              </label>
              <select
                name="color"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="blue">Blue</option>
                <option value="grey">Grey</option>
                <option value="greenishblue">Greenish Blue</option>
                <option value="white">White</option>
              </select>
            </div>

          </div>

          {/* Date + Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Unit
            </label>
            <select
              name="unit"
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="pairs">Pairs</option>
              <option value="boxes">Boxes</option>
              <option value="kg">KG</option>
              <option value="nos">Nos</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 active:scale-95 transition"
          >
            Add Production
          </button>

        </form>

      </div>

    </div>

  );
}