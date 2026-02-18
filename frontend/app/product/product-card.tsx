"use client";

import { useState, useEffect } from "react";

export default function ProductCard({ product }: any) {
  const [qty, setQty] = useState(0);

  // build image url safely
  const image =
    product?.image?.url
      ? process.env.NEXT_PUBLIC_STRAPI_URL + product.image.url
      : "/placeholder.png";

  // load saved cart quantity (page refresh persistence)
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) setQty(existing.qty);
  }, [product.id]);

  function updateCart(newQty: number) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (newQty === 0) {
      if (existingIndex !== -1) cart.splice(existingIndex, 1);
    } else {
      const itemData = {
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        image,
        qty: newQty,
      };

      if (existingIndex !== -1) {
        cart[existingIndex] = itemData;
      } else {
        cart.push(itemData);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQty(newQty);
  }

  function add() {
    updateCart(qty + 1);
  }

  function remove() {
    if (qty > 0) updateCart(qty - 1);
  }

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition relative">

      {/* IMAGE (LOCALHOST SAFE) */}
      <img
        src={image}
        alt={product.title}
        className="rounded-lg object-cover w-full h-32"
      />

      {/* TITLE */}
      <h3 className="mt-2 text-sm font-semibold line-clamp-2">
        {product.title}
      </h3>
       {/* DESCRIPTION */}
      <h5 className="mt-2 text-sm font-semibold line-clamp-2">
        {product.description}
      </h5>

      {/* UNIT */}
      <p className="text-xs text-gray-500">
        {product.unit || "1 pair"}
      </p>

      {/* PRICE + BUTTON */}
      <div className="flex items-center justify-between mt-2">
        <p className="font-bold text-green-700">₹{product.price}</p>

        {qty === 0 ? (
          <button
            onClick={add}
            className="border border-green-600 text-green-700 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-green-50"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center border border-green-600 rounded-lg overflow-hidden">
            <button
              onClick={remove}
              className="px-3 py-1 text-green-700 hover:bg-green-50"
            >
              −
            </button>

            <span className="px-3 font-semibold">{qty}</span>

            <button
              onClick={add}
              className="px-3 py-1 text-green-700 hover:bg-green-50"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
